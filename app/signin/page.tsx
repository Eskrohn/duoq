import SigninForm from "./signin-form";

export default function SigninPage() {
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
    <SigninForm providers={providers} credentialsEnabled={credentialsEnabled} />
  );
}
