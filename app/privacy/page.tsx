import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-20 pt-12">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]"
      >
        Back to DuoQ
      </Link>
      <h1 className="font-display mt-6 text-5xl tracking-[0.12em]">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-[color:var(--muted)]">
        Last updated: Today
      </p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-[color:var(--muted)]">
        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Data We Collect
          </h2>
          <p>
            We collect account details, profile content, messages, and usage
            data needed to provide DuoQ. We also store age verification data
            for compliance with our 18+ policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            How We Use Data
          </h2>
          <p>
            We use data to operate the platform, personalize discovery, improve
            safety, and respond to reports. We do not sell personal data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Sharing
          </h2>
          <p>
            We share data only with trusted service providers required to run
            DuoQ (hosting, storage, analytics) and when required by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Your Choices
          </h2>
          <p>
            You can edit your profile, control what you share, block users, and
            request account deletion. We honor data access and deletion
            requests as required by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-[0.14em] text-white">
            Contact
          </h2>
          <p>
            For privacy questions or requests, contact support@duoq.app.
          </p>
        </section>
      </div>
    </div>
  );
}
