import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-6 pb-20 pt-12">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]"
      >
        Back to DuoQ
      </Link>
      <h1 className="font-display mt-6 text-5xl tracking-[0.12em]">
        Signup is coming online soon.
      </h1>
      <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
        We are wiring up secure social login and 18+ age verification next.
        Check back shortly.
      </p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-[color:var(--muted)]">
        <p className="uppercase tracking-[0.3em] text-[color:var(--accent)]">
          Reminder
        </p>
        <p className="mt-3 leading-6">
          DuoQ is strictly 18+. Accounts are verified with date of birth and
          an age confirmation step.
        </p>
      </div>
    </div>
  );
}
