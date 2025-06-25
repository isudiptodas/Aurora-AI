import { db } from "@/config/astraConnect";
import { connectDb } from "@/config/connectDb";
import { Set } from "@/models/Set";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CohereEmbeddings } from "@langchain/cohere";

export async function GET(req: NextRequest) {

    await connectDb();

    const query = req.url.split('set=')[1];

    try {
        const found = await Set.findOne({ setName: query });

        if (!found) {
            return NextResponse.json({
                success: false,
                message: 'No set found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Set found',
            data: found
        }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { setName, userEmail, input } = await req.json();

    await connectDb();

    const GEMINI_API = process.env.GEMINI_API_KEY as string;
    const ai = new GoogleGenerativeAI(GEMINI_API);
    const COHERE_API = process.env.COHERE_API_KEY as string;

    const cohere = new CohereEmbeddings({
        apiKey: COHERE_API,
        model: "embed-english-v3.0"
    });

    try {

        const embedding = await cohere.embedQuery(input);

        const found = await Set.findOne({ setName, userEmail });
        const vectorColl = db.collection(setName);
        const vectorResult = vectorColl.find({}, {
            sort: {
                $vector: embedding,
            },
            limit: 10,
        });

        const results = await vectorResult.toArray();

        let appendedResult = '';

        for (let text of results) {
            appendedResult += text.text += ' ';
        }

        const model = 'gemini-1.5-flash';
        const chat = ai.getGenerativeModel({ model });

        const resp = await chat.generateContent([
            {
                text: `You are an AI assistant of a RAG application named AURORA AI and your job is to answer query of users
                based on the provided data and if the answer of the query doesnt available in the provided data then try to answer it on its own
                The data that is provided to you will me in an unorganized sentences and based on the question you have to make the answer from the
                provided data. And dont give any extra text or information just give the answer in response.
                QUESTION - ${input}.
                PROVIDED DATA - ${appendedResult}`
            }
        ]);

        const text = resp.response.text();
        const userChat = { role: 'user', content: input };
        const aiChat = { role: 'ai', content: text };

        found.chat.push(userChat, aiChat);
        await found.save();

        return NextResponse.json({
            success: true,
            message: 'Set found',
            data: found
        }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const url = req.url.split('set=')[1];

    try {
        const found = await Set.findOneAndDelete({ setName: url });
        if (found) {
            db.dropCollection(url);
            return NextResponse.json({
                success: true,
                message: 'Set deleted',
            }, { status: 201 });
        }

        return NextResponse.json({
            success: false,
            message: 'Set not found',
        }, { status: 404 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 500 });
    }
}