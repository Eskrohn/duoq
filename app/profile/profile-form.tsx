"use client";

import { useMemo, useState } from "react";

import { GAMES } from "@/lib/games";

const PLATFORMS = ["PC", "PlayStation", "Xbox", "Switch"] as const;
const PLAYSTYLES = ["Casual", "Ranked", "Competitive"] as const;
const LOOKING_FOR = ["Duo", "Squad", "Relationship"] as const;

type ProfileFormProps = {
  initialData?: {
    username: string;
    games: string[];
    platform: string | null;
    playstyle: string | null;
    lookingFor: string | null;
    bio: string | null;
    timezone: string | null;
  } | null;
};

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [username, setUsername] = useState(initialData?.username ?? "");
  const [games, setGames] = useState<string[]>(initialData?.games ?? []);
  const [platform, setPlatform] = useState(initialData?.platform ?? "");
  const [playstyle, setPlaystyle] = useState(initialData?.playstyle ?? "");
  const [lookingFor, setLookingFor] = useState(
    initialData?.lookingFor ?? ""
  );
  const [bio, setBio] = useState(initialData?.bio ?? "");
  const [timezone, setTimezone] = useState(initialData?.timezone ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const canSave = useMemo(
    () => username.trim().length >= 2 && games.length > 0,
    [username, games]
  );

  const toggleGame = (game: string) => {
    setGames((current) =>
      current.includes(game)
        ? current.filter((item) => item !== game)
        : [...current, game]
    );
  };

  const saveProfile = async () => {
    setStatus("saving");
    setError(null);

    const response = await fetch("/api/profile", {
      method: initialData ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        games,
        platform: platform || null,
        playstyle: playstyle || null,
        lookingFor: lookingFor || null,
        bio,
        timezone,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error ?? "Unable to save profile.");
      setStatus("error");
      return;
    }

    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="mt-8 space-y-10">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-2xl tracking-[0.16em] text-white">
          Core details
        </h2>
        <div className="mt-6 grid gap-6">
          <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
            Gamertag / Username
            <input
              className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Pick a unique name"
              required
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
            Timezone (optional)
            <input
              className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              placeholder="EST, PST, GMT+1"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[color:var(--panel)] p-6">
        <h2 className="font-display text-2xl tracking-[0.16em] text-white">
          Games you play
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Choose at least one.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {GAMES.map((game) => (
            <label
              key={game}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                games.includes(game)
                  ? "border-[color:var(--accent)] bg-white/10 text-white"
                  : "border-white/10 text-[color:var(--muted)]"
              }`}
            >
              <span>{game}</span>
              <input
                type="checkbox"
                className="h-4 w-4 accent-[color:var(--accent)]"
                checked={games.includes(game)}
                onChange={() => toggleGame(game)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <label className="rounded-2xl border border-white/10 bg-white/5 p-6 text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
          Platform
          <select
            className="mt-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          >
            <option value="">Select</option>
            {PLATFORMS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl border border-white/10 bg-white/5 p-6 text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
          Playstyle
          <select
            className="mt-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
            value={playstyle}
            onChange={(event) => setPlaystyle(event.target.value)}
          >
            <option value="">Select</option>
            {PLAYSTYLES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl border border-white/10 bg-white/5 p-6 text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
          Looking for
          <select
            className="mt-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
            value={lookingFor}
            onChange={(event) => setLookingFor(event.target.value)}
          >
            <option value="">Select</option>
            {LOOKING_FOR.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
          Bio
          <textarea
            className="mt-3 min-h-[140px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="What makes you a great duo?"
          />
        </label>
      </section>

      <section className="flex flex-col gap-4">
        <button
          type="button"
          onClick={saveProfile}
          disabled={!canSave || status === "saving"}
          className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition ${
            canSave && status !== "saving"
              ? "bg-[color:var(--accent)] text-black hover:translate-y-[-1px]"
              : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"
          }`}
        >
          {status === "saving" ? "Saving..." : "Save profile"}
        </button>
        {status === "saved" && (
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
            Profile saved
          </p>
        )}
        {status === "error" && error && (
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
