import { NextResponse } from "next/server";
import { Resend } from "resend";

const getResendClient = () => {
  return new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");
};

// Simple in-memory rate limiting (ephemeral but effective for bursts)
const ipCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 3;

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting check
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    const clientRecord = ipCache.get(ip);

    if (clientRecord) {
      if (now < clientRecord.resetTime) {
        if (clientRecord.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Too many messages sent. Please try again in a few minutes." },
            { status: 429 }
          );
        }
        clientRecord.count += 1;
      } else {
        clientRecord.count = 1;
        clientRecord.resetTime = now + RATE_LIMIT_WINDOW;
      }
    } else {
      ipCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    const body = await request.json();
    const { name: rawName, email: rawEmail, subject: rawSubject, message: rawMessage, honeypot } = body;

    // 2. Honeypot check (spam protection)
    if (honeypot && honeypot.trim() !== "") {
      console.warn("Honeypot triggered, simulating success.");
      return NextResponse.json({ success: true });
    }

    // 3. Trim inputs
    const name = (rawName || "").trim();
    const email = (rawEmail || "").trim();
    const subject = (rawSubject || "").trim();
    const message = (rawMessage || "").trim();

    // 4. Validate empty
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required and cannot be empty." },
        { status: 400 }
      );
    }

    // 5. Length checks
    if (name.length > 100) {
      return NextResponse.json({ error: "Name must be less than 100 characters." }, { status: 400 });
    }
    if (email.length > 100) {
      return NextResponse.json({ error: "Email must be less than 100 characters." }, { status: 400 });
    }
    if (subject.length > 200) {
      return NextResponse.json({ error: "Subject must be less than 200 characters." }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: "Message must be less than 5000 characters." }, { status: 400 });
    }

    // 6. Email format regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    // 7. Send notification email to Ujjwal
    const notificationResult = await getResendClient().emails.send({
      from: "Portfolio Contact <noreply@ujjwal.studio>",
      to: "ujjwal.verma1905@gmail.com",
      subject: `New Portfolio Contact: ${subject}`,
      text: `New Portfolio Contact\n\nName:\n${name}\n\nEmail:\n${email}\n\nSubject:\n${subject}\n\nMessage:\n${message}\n\nSubmitted:\n${submittedAt}\n`,
    });

    if (notificationResult.error) {
      console.error("Resend notification error:", notificationResult.error);
      return NextResponse.json(
        { error: "Failed to dispatch message via server. Please try again." },
        { status: 500 }
      );
    }

    // 8. Send automatic confirmation email to the sender
    try {
      await getResendClient().emails.send({
        from: "Ujjwal Verma <noreply@ujjwal.studio>",
        to: email,
        subject: "Thank you for reaching out",
        text: `Hi ${name},\n\nThank you for reaching out. I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nUjjwal Verma\nhttps://ujjwal.studio\n`,
      });
    } catch (confError) {
      console.warn("Resend confirmation error:", confError);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Contact API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
