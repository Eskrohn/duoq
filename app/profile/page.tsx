import Link from "next/link";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/auth";
import ProfileForm from "@/app/profile/profile-form";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const user = email
    ? await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      })
    : null;

  const profile = user
    ? await prisma.profile.findUnique({
        where: { userId: user.id },
      })
    : null;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-20 pt-12">
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
        Build your profile so you show up in discovery. Choose your games, set
        your vibe, and add a short bio.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">
          Signed in as
        </p>
        <p className="mt-3 text-lg text-white">
          {session?.user?.name ?? session?.user?.email ?? "Unknown"}
        </p>
      </div>

      <ProfileForm
        initialData={
          profile
            ? {
                username: profile.username,
                games: profile.games,
                platform: profile.platform,
                playstyle: profile.playstyle,
                lookingFor: profile.lookingFor,
                bio: profile.bio,
                timezone: profile.timezone,
              }
            : null
        }
      />
    </div>
  );
}
