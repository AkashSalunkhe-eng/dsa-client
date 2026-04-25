import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { AUTH_COOKIE_KEY, ROUTES } from "@/lib/constants";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_KEY)?.value;

  if (token) {
    redirect(ROUTES.dashboard);
  }

  return (
    <AuthShell
      eyebrow="Sign In"
      title="Welcome back"
      description="Login to continue managing topics, problems, and completion progress."
      footerText="New here?"
      footerLinkLabel="Create an account"
      footerHref={ROUTES.register}
    >
      <LoginForm />
    </AuthShell>
  );
}
