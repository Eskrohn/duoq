"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import AuthButtons from "@/components/AuthButtons";

type ProviderState = {
  discord: boolean;
  steam: boolean;
};

type SigninFormProps = {
  providers: ProviderState;
  credentialsEnabled: boolean;
};

export default function SigninForm({
  providers,
  credentialsEnabled,
}: SigninFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-6 pb-20 pt-12">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]"
      >
        Back to DuoQ
      </Link>
      <h1 className="font-display mt-6 text-5xl tracking-[0.12em]">
        Welcome back
      </h1>
      <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
        Sign in to continue matching. Discord and Steam are the primary options
        for DuoQ. If you are new here, head to signup to verify your age first.
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <AuthButtons providers={providers} />
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">
            Custom account
          </p>
          {credentialsEnabled ? (
            <form
              className="mt-4 space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                void signIn("credentials", {
                  email,
                  password,
                  callbackUrl: "/",
                });
              }}
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:translate-y-[-1px]"
              >
                Sign in
              </button>
            </form>
          ) : (
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Custom accounts will unlock after we connect the database.
            </p>
          )}
        </div>
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
        New to DuoQ?{" "}
        <Link href="/signup" className="text-[color:var(--accent)]">
          Create an account
        </Link>
      </p>
    </div>
  );
}
