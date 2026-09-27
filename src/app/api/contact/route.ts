import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown-ip";

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

    // Bot trap check: silently return success to mislead bots without calling Resend
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully. Thank you for reaching out.",
      });
    }

    // Input sanitization & validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "";
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

    // Environment variables verification
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";

    if (!resendApiKey || !receiverEmail) {
      console.error(
        "[Contact API Configuration Error]: RESEND_API_KEY or CONTACT_RECEIVER_EMAIL is not configured."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Contact email service is not configured.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const emailSubject = trimmedSubject
      ? `[Portfolio Contact] ${trimmedSubject}`
      : `[Portfolio Contact] New Message from ${trimmedName}`;

    const formattedDate =
      new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "long",
        timeStyle: "short",
      }) + " IST";

    const textBody = `--------------------------------
New Portfolio Contact
--------------------------------

Name: ${trimmedName}
Email: ${trimmedEmail}
Subject: ${trimmedSubject || "General Inquiry"}

Message:
${trimmedMessage}

Submitted:
${formattedDate}
--------------------------------`;

    const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1a202c;">
  <h2 style="margin-top: 0; padding-bottom: 12px; border-bottom: 2px solid #00d4ff; color: #0f172a; font-size: 20px;">
    New Portfolio Contact Submission
  </h2>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 100px;">Name:</td>
      <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(trimmedName)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Email:</td>
      <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #0284c7;">${escapeHtml(trimmedEmail)}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Subject:</td>
      <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(trimmedSubject || "General Inquiry")}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Submitted:</td>
      <td style="padding: 8px 0; color: #64748b;">${formattedDate}</td>
    </tr>
  </table>
  <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #00d4ff; border-radius: 4px;">
    <p style="margin: 0; font-weight: 600; color: #334155; margin-bottom: 8px;">Message:</p>
    <p style="margin: 0; white-space: pre-wrap; color: #1e293b; line-height: 1.6;">${escapeHtml(trimmedMessage)}</p>
  </div>
</div>
`;

    const toList = receiverEmail.includes(",")
      ? receiverEmail.split(",").map((e) => e.trim()).filter(Boolean)
      : receiverEmail.trim();

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toList,
      replyTo: trimmedEmail,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("[Resend Error]:", error.name, error.message);
      return NextResponse.json(
        {
          success: false,
          error: "Unable to send your message right now. Please try again or email directly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. Thank you for reaching out.",
    });
  } catch (error) {
    console.error(
      "[Contact API Error]:",
      error instanceof Error ? error.message : "Unexpected error"
    );
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please email directly.",
      },
      { status: 500 }
    );
  }
}
