"use client";

import Link from "next/link";

import AuthButtons from "@/components/AuthButtons";

type ProviderState = {
  google: boolean;
  discord: boolean;
};

type SigninFormProps = {
  providers: ProviderState;
};

export default function SigninForm({ providers }: SigninFormProps) {
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
        Sign in to continue matching. If you are new here, head to signup to
        verify your age first.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <AuthButtons providers={providers} />
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
