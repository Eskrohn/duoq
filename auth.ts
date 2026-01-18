import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import SteamProvider from "@/lib/steam-provider";
import { prisma } from "@/lib/prisma";

const providers: NextAuthOptions["providers"] = [];

if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
  providers.push(
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    })
  );
}

if (process.env.STEAM_API_KEY && process.env.NEXTAUTH_URL) {
  providers.push(
    SteamProvider({
      clientId: process.env.STEAM_API_KEY,
      clientSecret: process.env.STEAM_API_KEY,
    })
  );
}

if (process.env.DUOQ_LOCAL_EMAIL && process.env.DUOQ_LOCAL_PASSWORD) {
  providers.push(
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        if (
          email === process.env.DUOQ_LOCAL_EMAIL &&
          password === process.env.DUOQ_LOCAL_PASSWORD
        ) {
          return {
            id: "local-user",
            name: email.split("@")[0],
            email,
          };
        }
        return null;
      },
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "database",
  },
};
