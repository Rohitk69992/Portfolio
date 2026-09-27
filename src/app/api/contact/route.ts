import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter per IP: max 5 requests per 10 minutes
const ipRequestTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ip) || [];
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recentTimestamps = timestamps.filter((t) => t > windowStart);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recentTimestamps.push(now);
  ipRequestTimestamps.set(ip, recentTimestamps);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown-ip";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many contact submissions. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Bot trap check
    if (honeypot && String(honeypot).trim() !== "") {
      // Silently return success to mislead bots
      return NextResponse.json({
        success: true,
        message: "Message dispatched successfully.",
      });
    }

    // Input sanitization & validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "General Inquiry";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (2 to 100 characters)." },
        { status: 400 }
      );
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return NextResponse.json(
        { success: false, error: "Message must be between 10 and 2000 characters." },
        { status: 400 }
      );
    }

    // In production, send via SendGrid / Resend / Nodemailer if credentials exist
    console.info(
      `[Contact Submission Received] Name: ${trimmedName}, Email: ${trimmedEmail}, Subject: ${trimmedSubject}, Message Length: ${trimmedMessage.length}`
    );

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out, Rohit has received your message.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please email directly.",
      },
      { status: 500 }
    );
  }
}
