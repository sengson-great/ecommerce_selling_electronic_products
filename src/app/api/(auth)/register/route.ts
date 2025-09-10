import { connectToDatabase } from "@/app/db/mongoose";
import { User } from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    await connectToDatabase();
    const body = await request.json();
    const { email, password } = body;

    const existingUser = await User.findOne({ email});
    if (existingUser) {
        return NextResponse.json({error: "User already exists"}, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hashed});
    return NextResponse.json({ user }, { status: 201 });
}