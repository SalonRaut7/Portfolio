import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const LIMITS = { name: 100, replyTo: 254, body: 5000 };

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  const { SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { error: "Mail transport is not configured." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON body." }, { status: 400 });
  }

  const { name, reply_to: replyTo, body } = (payload ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof replyTo !== "string" ||
    typeof body !== "string" ||
    !name.trim() ||
    !replyTo.trim() ||
    !body.trim()
  ) {
    return NextResponse.json(
      { error: "name, reply_to and body are required." },
      { status: 400 },
    );
  }

  if (
    name.length > LIMITS.name ||
    replyTo.length > LIMITS.replyTo ||
    body.length > LIMITS.body
  ) {
    return NextResponse.json({ error: "Field too long." }, { status: 413 });
  }

  if (!isEmail(replyTo)) {
    return NextResponse.json(
      { error: "reply_to is not a valid email address." },
      { status: 422 },
    );
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user: SMTP_USER.trim(), pass: SMTP_PASS.replace(/\s+/g, "") },
  });

  try {
    await transport.sendMail({
      from: `"Portfolio contact" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${replyTo}>`,
      subject: `Portfolio message from ${name}`,
      text: `${body}\n\n— ${name} <${replyTo}>`,
    });
  } catch (error) {
    console.error("contact: sendMail failed", error);
    return NextResponse.json(
      { error: "Upstream mail server rejected the message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
