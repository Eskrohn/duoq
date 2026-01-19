import SignupForm from "./signup-form";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  const hasEnv = (value?: string) => Boolean(value && value.trim().length > 0);
  const providers = {
    discord:
      hasEnv(process.env.DISCORD_CLIENT_ID) &&
      hasEnv(process.env.DISCORD_CLIENT_SECRET),
    steam: hasEnv(process.env.STEAM_API_KEY),
  };

  const credentialsEnabled =
    hasEnv(process.env.DUOQ_LOCAL_EMAIL) &&
    hasEnv(process.env.DUOQ_LOCAL_PASSWORD);

  return (
    <SignupForm
      providers={providers}
      credentialsEnabled={credentialsEnabled}
    />
  );
}
