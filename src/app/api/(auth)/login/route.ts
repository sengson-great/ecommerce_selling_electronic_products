import { User } from "@/app/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "defaultsecret";
export async function POST(req: Request) {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {expiresIn: "1d"});
    (await cookies()).set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    })
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
}