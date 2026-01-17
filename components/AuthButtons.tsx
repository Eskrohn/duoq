"use client";

import { signIn } from "next-auth/react";

type ProviderKey = "google" | "discord";

type ProviderState = Record<ProviderKey, boolean>;

const PROVIDERS: Array<{
  id: ProviderKey;
  label: string;
  accent: string;
}> = [
  {
    id: "google",
    label: "Continue with Google",
    accent: "bg-white text-black hover:bg-[#f2f2f2]",
  },
  {
    id: "discord",
    label: "Continue with Discord",
    accent: "bg-[#5865f2] text-white hover:bg-[#4752c4]",
  },
];

type AuthButtonsProps = {
  providers: ProviderState;
  disabled?: boolean;
};

export default function AuthButtons({ providers, disabled }: AuthButtonsProps) {
  const anyEnabled = Object.values(providers).some(Boolean);

  return (
    <div className="space-y-3">
      {PROVIDERS.map((provider) => {
        const isEnabled = providers[provider.id];
        return (
          <button
            key={provider.id}
            type="button"
            className={`w-full rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
              isEnabled && !disabled
                ? provider.accent
                : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"
            }`}
            onClick={() => signIn(provider.id)}
            disabled={disabled || !isEnabled}
          >
            {provider.label}
          </button>
        );
      })}
      {!anyEnabled && (
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">
          Auth providers not configured yet
        </p>
      )}
    </div>
  );
}
