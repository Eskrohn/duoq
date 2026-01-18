import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";

const providers: NextAuthOptions["providers"] = [];

if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
  providers.push(
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
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
  providers,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
};
