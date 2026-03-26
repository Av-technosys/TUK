import { sendEmail } from "@/src/lib/mailer";

export async function POST(req: Request) {
  try {
    const { name, company, email, phone, inquiry, message } = await req.json();

    const emailContent = `
New Contact Form Submission:

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Inquiry: ${inquiry}

Message:
${message}
    `;

    await sendEmail(
      process.env.EMAIL_USER!, // you receive email
      "New Contact Form Message",
      emailContent
    );

    return Response.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}