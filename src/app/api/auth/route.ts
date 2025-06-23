import { connectDb } from "@/config/connectDb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const { type } = body;

    await connectDb();

    if (type === 'register') {
        const { name, email, password } = body;

        try {
            const found = await User.findOne({ email });

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
        const { email, password } = body;

        const found = await User.findOne({ email });

        if (!found) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        const matched = await bcrypt.compare(password, found.password);

        if (!matched) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            }, { status: 401 });
        }

        const token = jwt.sign({ email: found.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

        const res = NextResponse.json({
            success: true,
            message: "Login successful"
        }, { status: 200 });

        res.cookies.set('token', token, {
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
            maxAge: 86400000,
            path: '/'
        });

        return res;
    }
    else if(type === 'logout'){
        const res = NextResponse.json({
            success: true,
            message: `Logout successful`
        }, {status: 200});

        res.cookies.set('token', "", {
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 0
        });

        return res;
        
    }
    else {
        return NextResponse.json({
            success: false,
            message: "Invalid Request"
        }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {

    await connectDb();
    
    //const token = req.headers.get('cookie')?.split('=')[1] as string;
    const token = (await cookies()).get('token')?.value as string;

    try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const { email } = payload;
        const found = await User.findOne({ email });

        if (found) {
            return NextResponse.json({
                success: true,
                message: "Successful",
                found
            }, { status: 200 });
        }

        return NextResponse.json({
            success: false,
            message: "User not found"
        }, { status: 404 });


    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, { status: 500 });
    }
}
