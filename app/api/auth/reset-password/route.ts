import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email, otp, newPassword } = await req.json();

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });

  if (!user || user.otp !== otp) {
    return Response.json({ error: "Invalid OTP" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({ password: hashed, otp: null })
    .where(eq(users.email, email));

  return Response.json({ success: true });
}