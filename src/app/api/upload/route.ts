import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { db } from "@/config/astraConnect";
import { connectDb } from "@/config/connectDb";

export async function POST(req: NextRequest) {

    await connectDb();

    const body = await req.json();
    const { type } = body;

    if (type === 'pdf') {
        const { name, pdfText } = body;

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 20,
            chunkOverlap: 5
        });

        const output = await splitter.splitText(pdfText);

        return NextResponse.json({
            success: true,
            message: "Successful"
        }, { status: 200 });
    }
    else if (type === 'web') {

    }
    else if (type === 'youtube') {
        const { name, youtube } = body;

        try {
            const loader = YoutubeLoader.createFromUrl('https://youtu.be/6biMWgD6_JY?si=7IKBiyOCSTkezmYX', {
                addVideoInfo: false,
                language: "en",
            });
            const result = await loader.load();

            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 20,
                chunkOverlap: 5
            });

            const output = await splitter.splitText(result[0].pageContent);
            
            return NextResponse.json({
                success: true,
                message: "Successfull",
                text: output
            }, { status: 200 });

        } catch (err) {
            console.log(`error detected`);
        }
    }

    return NextResponse.json({
        success: false,
        message: "Invalid request"
    }, { status: 400 });

}