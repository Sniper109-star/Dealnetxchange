import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body ?? {};
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required." },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, received: { name, email } });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
