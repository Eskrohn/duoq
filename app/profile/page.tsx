import Link from "next/link";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-20 pt-12">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]"
      >
        Back to DuoQ
      </Link>
      <h1 className="font-display mt-6 text-5xl tracking-[0.12em]">
        Your Profile
      </h1>
      <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
        This is the first protected page. Next we will build the full profile
        editor here.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">
          Signed in as
        </p>
        <p className="mt-3 text-lg text-white">
          {session?.user?.name ?? session?.user?.email ?? "Unknown"}
        </p>
      </div>
    </div>
  );
}
