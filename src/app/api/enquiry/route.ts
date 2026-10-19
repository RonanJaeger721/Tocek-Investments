import { NextRequest, NextResponse } from "next/server";
const allowed = [
  "General enquiry",
  "Seed products",
  "Bulk orders",
  "Distributors",
  "International partnerships",
  "Seed production",
  "Research collaboration",
  "Media enquiries",
];
export async function POST(req: NextRequest) {
  const json = (error: string, status: number) =>
    NextResponse.json({ error }, { status });
  const origin = req.headers.get("origin");
  let originUrl: URL;
  try {
    originUrl = new URL(origin || "");
  } catch {
    return json("This request is not permitted.", 403);
  }
  if (
    !["http:", "https:"].includes(originUrl.protocol) ||
    originUrl.host !== req.headers.get("host")
  )
    return json("This request is not permitted.", 403);
  if (Number(req.headers.get("content-length") || 0) > 16000)
    return json("Your enquiry is too long.", 413);
  let data: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 16000) return json("Your enquiry is too long.", 413);
    data = JSON.parse(text);
  } catch {
    return json("Please send a valid enquiry.", 400);
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return json("Please send a valid enquiry.", 400);
  if (data.website) return json("Unable to submit this enquiry.", 400);
  if (
    !data.consent ||
    typeof data.startedAt !== "number" ||
    Date.now() - data.startedAt < 3000 ||
    Date.now() - data.startedAt > 86400000
  )
    return json("Please review the form and try again.", 400);
  const field = (key: string, max: number) =>
    typeof data[key] === "string"
      ? (data[key] as string).trim().slice(0, max)
      : "";
  const name = field("name", 120),
    email = field("email", 200),
    country = field("country", 100),
    message = field("message", 5000),
    interest = field("interest", 100);
  if (
    !name ||
    !country ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 15 ||
    !allowed.includes(interest)
  )
    return json("Please complete all required fields with valid details.", 400);
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.ENQUIRY_FROM ||
    !process.env.ENQUIRY_TO ||
    !process.env.TURNSTILE_SECRET_KEY
  )
    return json(
      "Online delivery is not yet available. Please call +263 772 568329.",
      503,
    );
  try {
    const check = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: field("token", 3000),
        }),
        signal: AbortSignal.timeout(10000),
      },
    );
    const verified = await check.json();
    if (!verified.success)
      return json("Please complete the security check and try again.", 400);
    const host = verified.hostname;
    if (host !== originUrl.hostname)
      return json("Security verification could not be completed.", 400);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM,
        to: [process.env.ENQUIRY_TO],
        reply_to: email,
        subject: `Tocek enquiry: ${interest}`,
        text: `Name: ${name}\nOrganisation: ${field("organisation", 160)}\nCountry: ${country}\nEmail: ${email}\nPhone: ${field("phone", 40)}\nInterest: ${interest}\nProduct: ${field("product", 150)}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      return json(
        "Delivery could not be confirmed. Please call the team or try again later.",
        502,
      );
    return NextResponse.json({ delivered: true });
  } catch {
    return json(
      "Delivery is temporarily unavailable. Please call the team.",
      502,
    );
  }
}
