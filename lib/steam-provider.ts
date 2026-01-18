import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

type SteamProfile = {
  steamid: string;
  personaname: string;
  avatarfull: string;
};

const STEAM_OPENID_URL = "https://steamcommunity.com/openid/login";
const STEAM_PROFILE_URL =
  "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";

function steamIdFromClaimedId(claimedId?: string) {
  if (!claimedId) return null;
  const parts = claimedId.split("/");
  return parts[parts.length - 1] || null;
}

export default function SteamProvider(
  options: OAuthUserConfig<SteamProfile>
): OAuthConfig<SteamProfile> {
  const baseUrl = process.env.NEXTAUTH_URL;

  return {
    id: "steam",
    name: "Steam",
    type: "oauth",
    checks: ["none"],
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    authorization: {
      url: STEAM_OPENID_URL,
      params: {
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": `${baseUrl}/api/auth/callback/steam`,
        "openid.realm": baseUrl,
        "openid.identity":
          "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id":
          "http://specs.openid.net/auth/2.0/identifier_select",
      },
    },
    token: {
      async request({ params }) {
        const body = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (typeof value === "string") {
            body.set(key, value);
          }
        });

        body.set("openid.mode", "check_authentication");

        const response = await fetch(STEAM_OPENID_URL, {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body,
        });

        const text = await response.text();

        if (!text.includes("is_valid:true")) {
          throw new Error("Steam OpenID validation failed");
        }

        const claimedId =
          (params["openid.claimed_id"] as string | undefined) ??
          (params["openid.identity"] as string | undefined);
        const steamid = steamIdFromClaimedId(claimedId);

        if (!steamid) {
          throw new Error("Steam ID not found");
        }

        return { tokens: { steamid } };
      },
    },
    userinfo: {
      async request({ tokens }) {
        const steamid = (tokens as { steamid?: string }).steamid;
        const apiKey = options.clientSecret || options.clientId;

        if (!steamid || !apiKey) {
          throw new Error("Steam profile lookup failed");
        }

        const response = await fetch(
          `${STEAM_PROFILE_URL}?key=${apiKey}&steamids=${steamid}`
        );

        if (!response.ok) {
          throw new Error("Steam profile lookup failed");
        }

        const data = (await response.json()) as {
          response?: { players?: SteamProfile[] };
        };

        const profile = data.response?.players?.[0];
        if (!profile) {
          throw new Error("Steam profile not found");
        }

        return profile;
      },
    },
    profile(profile) {
      return {
        id: profile.steamid,
        name: profile.personaname,
        image: profile.avatarfull,
      };
    },
  };
}
