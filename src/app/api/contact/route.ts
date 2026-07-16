import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail, sendContactConfirmationEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional().default(""),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Name, email and phone are required." },
        { status: 400 },
      );
    }
    const { name, email, phone, message } = parsed.data;

    try {
      await sendContactEmail({ name, email, phone, message });
      await sendContactConfirmationEmail(email, name);
    } catch {
      /* email failures must not break the contact submission */
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
