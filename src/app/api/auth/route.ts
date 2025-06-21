import { connectDb } from "@/config/connectDb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const { type } = body;

    await connectDb();

    if (type === 'register') {
        const { name, email, password } = body;

        try {
            const found = await User.findOne({email});

            if (found) {
                return NextResponse.json({
                    success: false,
                    message: "User already exists"
                }, { status: 403 });
            }

            const hashed = await bcrypt.hash(password, 10);
            const newUser = new User({
                name, email, password: hashed
            });

            await newUser.save();

            return NextResponse.json({
                success: true,
                message: "User registered"
            }, { status: 200 });

        } catch (err) {
            console.log(err);
            return NextResponse.json({
                success: false,
                message: "Internal Server Error"
            }, { status: 500 });
        }
    }
    else if (type === 'login') {

    }
    else {
        return NextResponse.json({
            success: false,
            message: "Invalid Request"
        }, { status: 400 });
    }
}
