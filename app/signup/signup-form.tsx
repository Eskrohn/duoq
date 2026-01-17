"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import AuthButtons from "@/components/AuthButtons";

type ProviderState = {
  google: boolean;
  discord: boolean;
};

type SignupFormProps = {
  providers: ProviderState;
};

function isAdult(birthDate: string) {
  if (!birthDate) return false;
  const dob = new Date(birthDate);
  if (Number.isNaN(dob.getTime())) return false;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }

  return age >= 18;
}

export default function SignupForm({ providers }: SignupFormProps) {
  const [birthDate, setBirthDate] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const isOldEnough = useMemo(() => isAdult(birthDate), [birthDate]);
  const canContinue = isOldEnough && confirmed;

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-6 pb-20 pt-12">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]"
      >
        Back to DuoQ
      </Link>
      <h1 className="font-display mt-6 text-5xl tracking-[0.12em]">
        Create your DuoQ account
      </h1>
      <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
        DuoQ is 18+ only. We verify age at signup and store your attestation
        for compliance.
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <label className="block text-sm uppercase tracking-[0.3em] text-[color:var(--accent)]">
          Date of birth
          <input
            type="date"
            className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            required
          />
        </label>
        <label className="flex items-start gap-3 text-sm text-[color:var(--muted)]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            required
          />
          <span>
            I confirm I am 18 years or older and agree to the Terms, Privacy
            Policy, and Community Guidelines.
          </span>
        </label>
      </div>

      <div className="mt-8">
        <AuthButtons providers={providers} disabled={!canContinue} />
        {!isOldEnough && birthDate && (
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">
            You must be 18+ to continue
          </p>
        )}
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
        Already have an account?{" "}
        <Link href="/signin" className="text-[color:var(--accent)]">
          Sign in
        </Link>
      </p>
    </div>
  );
}
