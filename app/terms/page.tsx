import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-20 pt-12">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]"
      >
        Back to DuoQ
      </Link>
      <h1 className="font-display mt-6 text-5xl tracking-[0.12em]">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-[color:var(--muted)]">
        Last updated: Today
      </p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-[color:var(--muted)]">
        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            18+ Only
          </h2>
          <p>
            DuoQ is for adults only. You must be at least 18 years old to use
            the service. We require a date of birth and an age attestation at
            signup. Accounts that violate this policy are removed immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Account Responsibilities
          </h2>
          <p>
            You are responsible for the information you provide and the content
            you share. Do not impersonate others, post illegal content, or use
            DuoQ to harass or exploit anyone.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Matches and Messaging
          </h2>
          <p>
            Messaging is only available after a mutual match. You agree to use
            the chat respectfully and to stop messaging anyone who asks you to
            stop.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Termination
          </h2>
          <p>
            We may suspend or terminate accounts that violate these terms,
            community guidelines, or safety policies. You can request account
            deletion at any time from settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Contact
          </h2>
          <p>
            For questions, safety concerns, or legal requests, contact the
            DuoQ team at support@duoq.app.
          </p>
        </section>
      </div>
    </div>
  );
}
