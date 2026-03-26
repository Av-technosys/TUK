import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import bcrypt from "bcryptjs";
import { generateOTP } from "@/src/lib/otp";
import { sendEmail } from "@/src/lib/mailer";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  await db.insert(users).values({
    name,
    email,
    password: hashed,
    otp,
    otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendEmail(email, "Your OTP", `OTP: ${otp}`);

  return Response.json({ success: true });
}