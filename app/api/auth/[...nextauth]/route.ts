import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
   async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Missing email or password");
  }

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, credentials.email),
  });

  if (!user) throw new Error("User not found");

  if (!user.password) {
    throw new Error("Password not set");
  }

  const isValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isValid) throw new Error("Invalid password");

  if (!user.isVerified) throw new Error("Verify email first");

  return user;
}
    }),
  ],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };