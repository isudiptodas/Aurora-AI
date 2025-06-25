import { connectDb } from "@/config/connectDb";
import { Set } from "@/models/Set";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectDb();

    const query = req.url.split('user=')[1];
    const decoded = decodeURIComponent(query);

    try {
        const found = await Set.find({ userEmail: decoded });

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