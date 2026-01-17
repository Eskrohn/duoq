import SigninForm from "./signin-form";

export default function SigninPage() {
  const providers = {
    google:
      Boolean(process.env.GOOGLE_CLIENT_ID) &&
      Boolean(process.env.GOOGLE_CLIENT_SECRET),
    discord:
      Boolean(process.env.DISCORD_CLIENT_ID) &&
      Boolean(process.env.DISCORD_CLIENT_SECRET),
  };

  return <SigninForm providers={providers} />;
}
