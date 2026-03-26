import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { sendEmail } from "@/src/lib/mailer";
import { generateOTP } from "@/src/lib/otp";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email } = await req.json();

  const otp = generateOTP();

  await db
    .update(users)
    .set({
      otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    })
    .where(eq(users.email, email));

  await sendEmail(email, "Reset OTP", `OTP: ${otp}`);

  return Response.json({ success: true });
}