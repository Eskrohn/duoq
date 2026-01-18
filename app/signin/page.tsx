import SigninForm from "./signin-form";

export default function SigninPage() {
  const providers = {
    discord:
      Boolean(process.env.DISCORD_CLIENT_ID) &&
      Boolean(process.env.DISCORD_CLIENT_SECRET),
    steam: Boolean(process.env.STEAM_API_KEY),
  };

  const credentialsEnabled =
    Boolean(process.env.DUOQ_LOCAL_EMAIL) &&
    Boolean(process.env.DUOQ_LOCAL_PASSWORD);

  return (
    <SigninForm providers={providers} credentialsEnabled={credentialsEnabled} />
  );
}
