const SECRET = process.env.JWT_SECRET || "defaultsecret";

import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const pathname = req.nextUrl.pathname;

    if(pathname.startsWith('/api/auth') || pathname.startsWith('/login') || pathname.startsWith('/register')){
        return NextResponse.next();
    }

    try {
        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }
        jwt.verify(token || '', SECRET);
        return NextResponse.next();
        
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/users/:path*', '/login'],
}