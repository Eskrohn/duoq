"use client";

type ProviderKey = "discord" | "steam";

type ProviderState = Record<ProviderKey, boolean>;

const PROVIDERS: Array<{
  id: ProviderKey;
  label: string;
  accent: string;
}> = [
  {
    id: "discord",
    label: "Continue with Discord",
    accent: "bg-[#5865f2] text-white hover:bg-[#4752c4]",
  },
  {
    id: "steam",
    label: "Continue with Steam",
    accent: "bg-[#1b2838] text-white hover:bg-[#243447]",
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
        const canNavigate = !disabled;
        return (
          <div key={provider.id}>
            {canNavigate ? (
              <a
                href={`/api/auth/signin/${provider.id}?callbackUrl=/profile`}
                className={`block w-full rounded-full px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] transition ${
                  isEnabled
                    ? provider.accent
                    : "border border-white/10 bg-white/5 text-white/60"
                }`}
              >
                {provider.label}
              </a>
            ) : (
              <button
                type="button"
                className="w-full cursor-not-allowed rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/40"
                disabled
              >
                {provider.label}
              </button>
            )}
          </div>
        );
      })}
      {!anyEnabled && (
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">
          Social logins not configured yet
        </p>
      )}
    </div>
  );
}
