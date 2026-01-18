import SignupForm from "./signup-form";

export default function SignupPage() {
  const providers = {
    discord:
      Boolean(process.env.DISCORD_CLIENT_ID) &&
      Boolean(process.env.DISCORD_CLIENT_SECRET),
    steam: process.env.STEAM_LOGIN_ENABLED === "true",
  };

  const credentialsEnabled =
    Boolean(process.env.DUOQ_LOCAL_EMAIL) &&
    Boolean(process.env.DUOQ_LOCAL_PASSWORD);

  return (
    <SignupForm
      providers={providers}
      credentialsEnabled={credentialsEnabled}
    />
  );
}
