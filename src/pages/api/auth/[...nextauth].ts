// [...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token.device_id = account.device_id as string | undefined;
        token.device_name = account.device_name as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      session.device_id = token.device_id;
      session.device_name = token.device_name;
      return session;
    },
  },
};

export default NextAuth(authOptions);
