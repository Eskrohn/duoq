import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/auth";
import { GAMES } from "@/lib/games";
import { prisma } from "@/lib/prisma";

type ProfilePayload = {
  username?: string;
  games?: string[];
  platform?: string | null;
  playstyle?: string | null;
  lookingFor?: string | null;
  bio?: string | null;
  timezone?: string | null;
};

function sanitizePayload(payload: ProfilePayload) {
  const games = Array.isArray(payload.games)
    ? payload.games.filter((game) => GAMES.includes(game as (typeof GAMES)[number]))
    : [];

  const username = payload.username?.trim();

  return {
    username,
    games,
    platform: payload.platform?.trim() || null,
    playstyle: payload.playstyle?.trim() || null,
    lookingFor: payload.lookingFor?.trim() || null,
    bio: payload.bio?.trim() || null,
    timezone: payload.timezone?.trim() || null,
  };
}

async function getUser() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return null;

  return prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
}

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });

  return NextResponse.json({ profile });
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = sanitizePayload((await request.json()) as ProfilePayload);

  if (!payload.username) {
    return NextResponse.json(
      { error: "Username is required." },
      { status: 400 }
    );
  }

  if (payload.games.length === 0) {
    return NextResponse.json(
      { error: "Select at least one game." },
      { status: 400 }
    );
  }

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      username: payload.username,
      games: payload.games,
      platform: payload.platform,
      playstyle: payload.playstyle,
      lookingFor: payload.lookingFor,
      bio: payload.bio,
      timezone: payload.timezone,
    },
  });

  return NextResponse.json({ profile }, { status: 201 });
}

export async function PUT(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = sanitizePayload((await request.json()) as ProfilePayload);

  if (payload.username && payload.username.length < 2) {
    return NextResponse.json(
      { error: "Username must be at least 2 characters." },
      { status: 400 }
    );
  }

  if (payload.games.length === 0) {
    return NextResponse.json(
      { error: "Select at least one game." },
      { status: 400 }
    );
  }

  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      username: payload.username ?? `player-${user.id.slice(0, 6)}`,
      games: payload.games,
      platform: payload.platform,
      playstyle: payload.playstyle,
      lookingFor: payload.lookingFor,
      bio: payload.bio,
      timezone: payload.timezone,
    },
    update: {
      username: payload.username ?? undefined,
      games: payload.games,
      platform: payload.platform,
      playstyle: payload.playstyle,
      lookingFor: payload.lookingFor,
      bio: payload.bio,
      timezone: payload.timezone,
    },
  });

  return NextResponse.json({ profile });
}
