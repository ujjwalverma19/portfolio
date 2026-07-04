import { NextResponse } from "next/server";
import { Resend } from "resend";

const getResendClient = () => {
  return new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    // 1. Send notification email to Ujjwal
    const notificationResult = await getResendClient().emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "ujjwal.verma1905@gmail.com",
      subject: `New Portfolio Contact: ${subject}`,
      text: `New Portfolio Contact\n\nName:\n${name}\n\nEmail:\n${email}\n\nSubject:\n${subject}\n\nMessage:\n${message}\n\nSubmitted:\n${submittedAt}\n`,
    });

    if (notificationResult.error) {
      console.error("Resend notification error:", notificationResult.error);
      return NextResponse.json(
        { error: notificationResult.error.message },
        { status: 500 }
      );
    }

    // 2. Send automatic confirmation email to the sender
    try {
      await getResendClient().emails.send({
        from: "Ujjwal Verma <onboarding@resend.dev>",
        to: email,
        subject: "Thank you for reaching out",
        text: `Hi ${name},\n\nThank you for reaching out. I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nUjjwal Verma\nhttps://ujjwal.studio\n`,
      });
    } catch (confError) {
      // Log but do not block response if confirmation email fails (e.g. sandbox restriction)
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
