import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-10 pt-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-white/10 bg-[linear-gradient(135deg,#36f3d2,#ffd84d)] shadow-[0_0_30px_rgba(54,243,210,0.35)]" />
          <div>
            <p className="font-display text-3xl tracking-[0.2em]">DuoQ</p>
            <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
              Gamer Matchmaking
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-[color:var(--muted)] md:flex">
          <Link href="/terms" className="hover:text-[color:var(--foreground)]">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:text-[color:var(--foreground)]"
          >
            Privacy
          </Link>
          <Link
            href="/guidelines"
            className="hover:text-[color:var(--foreground)]"
          >
            Guidelines
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6 reveal">
            <p className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]">
              18+ only
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              No minors allowed
            </p>
            <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-[0.08em] text-white sm:text-6xl lg:text-7xl">
              Find your duo.
              <br />
              Queue for chemistry.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[color:var(--muted)]">
              DuoQ connects gamers who want more than random squads. Build a
              profile, discover players with your vibe, and match when it feels
              right.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black shadow-[0_0_40px_rgba(54,243,210,0.35)] transition hover:translate-y-[-1px]"
              >
                Join the queue
              </Link>
              <Link
                href="/guidelines"
                className="flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white/50"
              >
                Community rules
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[color:var(--panel)] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] reveal reveal-delay-1">
            <div className="space-y-6 rounded-2xl border border-white/5 bg-[color:var(--panel-strong)] p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--accent-2)]">
                Discover feed
              </p>
              <div className="space-y-4">
                {[
                  {
                    name: "Nyx",
                    detail: "Valorant • PC • Competitive",
                  },
                  {
                    name: "Volt",
                    detail: "Apex Legends • PS • Duo",
                  },
                  {
                    name: "Nova",
                    detail: "Overwatch • Xbox • Casual",
                  },
                ].map((profile) => (
                  <div
                    key={profile.name}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <div>
                      <p className="font-display text-2xl tracking-[0.18em]">
                        {profile.name}
                      </p>
                      <p className="text-xs text-[color:var(--muted)]">
                        {profile.detail}
                      </p>
                    </div>
                    <button className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
                      Like
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Build your loadout",
              copy: "Choose your games, platform, playstyle, and what you want from a duo.",
            },
            {
              title: "Swipe the feed",
              copy: "Global discovery with simple filters and no endless search.",
            },
            {
              title: "Match + chat",
              copy: "Mutual likes open a private chat, with safety tools ready.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 reveal reveal-delay-2"
            >
              <p className="font-display text-2xl tracking-[0.16em]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {item.copy}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-[color:var(--panel)] p-8 reveal reveal-delay-2">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--accent)]">
              Safety first
            </p>
            <h2 className="font-display mt-4 text-4xl tracking-[0.12em]">
              Built to keep the lobby clean.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              Every profile is 18+ verified, with block and report tools in
              reach. Discovery excludes blocked users automatically and matches
              can only message after mutual likes.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[color:var(--panel-strong)] p-8 reveal reveal-delay-3">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--accent-2)]">
              MVP focus
            </p>
            <h2 className="font-display mt-4 text-4xl tracking-[0.12em]">
              No noise. Just duos.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              We start with profiles, discovery, matching, and messaging. Every
              new feature earns its spot after the core flow feels right.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 text-sm text-[color:var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>
            DuoQ is 18+ only. By continuing you agree to the community and
            legal policies.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="hover:text-[color:var(--foreground)]">
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[color:var(--foreground)]"
            >
              Privacy
            </Link>
            <Link
              href="/guidelines"
              className="hover:text-[color:var(--foreground)]"
            >
              Community Guidelines
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
