import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { db } from "@/config/astraConnect";
import { connectDb } from "@/config/connectDb";
import OpenAI from "openai";
import { Set } from "@/models/Set";
import { CohereEmbeddings } from "@langchain/cohere";

export async function POST(req: NextRequest) {

    await connectDb();

    const body = await req.json();
    const { type } = body;

    const OPENAI_API = process.env.OPENAI_API_KEY as string;
    const COHERE_API = process.env.COHERE_API_KEY as string;

    // const openai = new OpenAI({
    //     apiKey: OPENAI_API
    // });

    const cohere = new CohereEmbeddings({
        apiKey: COHERE_API,
        model: "embed-english-v3.0"
    });

    if (type === 'pdf') {
        const { name, pdfText, today, userEmail, original } = body;

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 200,
            chunkOverlap: 20
        });

        const result = await splitter.splitText(pdfText);

        const list = db.listCollections();
        const found = (await list).some((coll) => coll?.name === name);

        if (found) {
            return NextResponse.json({
                success: false,
                message: "Set with same name exists"
            }, { status: 401 });
        }

        const newCol = await db.createCollection(name, {
            vector: {
                dimension: 1024,
                metric: 'dot_product'
            }
        });

        try {
            for (let text of result) {
                // const embedding = await openai.embeddings.create({
                //     model: "text-embedding-3-small",
                //     input: text,
                //     encoding_format: "float",
                // });

                const embedding = await cohere.embedQuery(text);

                const resp = await newCol.insertOne({
                    $vector: embedding,
                    text: text
                });
            }

            const newSet = new Set({
                setName: name,
                userEmail: userEmail,
                setType: type,
                vectorCollectionName: name,
                dateCreated: today,
                original: original
            });

            await newSet.save();

            return NextResponse.json({
                success: true,
                message: "Successful",
                data: newSet
            }, { status: 200 });
        } catch (err) {
            console.log(err);
            return NextResponse.json({
                success: false,
                message: "Something went wrong"
            }, { status: 500 });
        }
    }
    else if (type === 'web') {
        const { name, web, today, userEmail, original } = body;

        try {

            const list = db.listCollections();
            const found = (await list).some((coll) => coll?.name === name);

            if (found) {
                return NextResponse.json({
                    success: false,
                    message: "Set with same name exists"
                }, { status: 401 });
            }

            const newCol = await db.createCollection(name, {
                vector: {
                    dimension: 1024,
                    metric: 'dot_product'
                }
            });

            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 200,
                chunkOverlap: 20
            });

            const result = await splitter.splitText(web);

            for (let text of result) {
                // const embedding = await openai.embeddings.create({
                //     model: "text-embedding-3-small",
                //     input: text,
                //     encoding_format: "float",
                // });

                const embedding = await cohere.embedQuery(text);

                const resp = await newCol.insertOne({
                    $vector: embedding,
                    text: text
                });
            }

            const newSet = new Set({
                setName: name,
                userEmail: userEmail,
                setType: type,
                vectorCollectionName: name,
                dateCreated: today,
                original: original
            });

            await newSet.save();


            return NextResponse.json({
                success: true,
                message: "Successful",
                data: newSet
            }, { status: 200 });
        } catch (err) {
            console.log(`Error -> `, err);
            return NextResponse.json({
                success: false,
                message: "Something went wrong"
            }, { status: 500 });
        }

    }
    else if (type === 'youtube') {
        const { name, youtube, today, userEmail } = body;

        try {
            const loader = YoutubeLoader.createFromUrl(youtube, {
                addVideoInfo: false,
                language: "en",
            });
            const result = await loader.load();

            if (result && result[0].pageContent) {
                const splitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 200,
                    chunkOverlap: 20
                });

                const output = await splitter.splitText(result[0].pageContent);

                const list = db.listCollections();
                const found = (await list).some((coll) => coll?.name === name);

                if (found) {
                    return NextResponse.json({
                        success: false,
                        message: "Set with same name exists"
                    }, { status: 401 });
                }

                const newCol = await db.createCollection(name, {
                    vector: {
                        dimension: 1024,
                        metric: 'dot_product'
                    }
                });

                for (let text of output) {
                    // const embedding = await openai.embeddings.create({
                    //     model: "text-embedding-3-small",
                    //     input: text,
                    //     encoding_format: "float",
                    // });

                    const embedding = await cohere.embedQuery(text);

                    const resp = await newCol.insertOne({
                        $vector: embedding,
                        text: text
                    });
                }

                const newSet = new Set({
                    setName: name,
                    userEmail: userEmail,
                    setType: type,
                    vectorCollectionName: name,
                    dateCreated: today,
                    original: youtube
                });

                await newSet.save();

                return NextResponse.json({
                    success: true,
                    message: "Successfull",
                    data: newSet
                }, { status: 200 });
            }

        } catch (err) {
            //console.log(`error detected`);
            return NextResponse.json({
                success: false,
                message: "Something went wrong",
            }, { status: 500 });
        }
    }

    return NextResponse.json({
        success: false,
        message: "Invalid request type !"
    }, { status: 401 });

}
