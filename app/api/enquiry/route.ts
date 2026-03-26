import { sendEmail } from "@/src/lib/mailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const message = `
New Enquiry:

Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone}
Product: ${data.product}
Spend: ${data.spend}

Message:
${data.message}
    `;

    await sendEmail(
      process.env.EMAIL_USER!,
      "New Enquiry Form",
      message
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}