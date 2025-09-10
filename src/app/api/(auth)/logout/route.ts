import { cookies } from "next/headers";

export async function POST(req: Request) {
    (await cookies()).set('token', '', {maxAge: -1, path: '/'});
    return new Response(JSON.stringify({ message: "Logout successful" }), { status: 200 });
}