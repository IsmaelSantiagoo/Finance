// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    device_id?: string;
    device_name?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    device_id?: string;
    device_name?: string;
  }
}
