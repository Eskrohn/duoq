import Link from "next/link";

export default function GuidelinesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-20 pt-12">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]"
      >
        Back to DuoQ
      </Link>
      <h1 className="font-display mt-6 text-5xl tracking-[0.12em]">
        Community Guidelines
      </h1>
      <p className="mt-4 text-sm text-[color:var(--muted)]">
        Last updated: Today
      </p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-[color:var(--muted)]">
        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Respect Always
          </h2>
          <p>
            DuoQ is a space for adults to connect. Hate speech, harassment,
            discrimination, or threats are not allowed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Zero Tolerance for Minors
          </h2>
          <p>
            We do not allow anyone under 18 on the platform. Report any
            suspected minor accounts immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Reporting
          </h2>
          <p>
            Use the report tool for abuse, scams, or unsafe behavior. Reports
            are reviewed and can result in suspension or removal.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Content Standards
          </h2>
          <p>
            Profile images and messages must be appropriate, legal, and
            non-explicit. Spam and advertising are prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Blocking
          </h2>
          <p>
            Block anyone who makes you uncomfortable. Blocking hides profiles,
            prevents matches, and stops messaging.
          </p>
        </section>
      </div>
    </div>
  );
}
