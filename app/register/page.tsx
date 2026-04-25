import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { AUTH_COOKIE_KEY, ROUTES } from "@/lib/constants";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_KEY)?.value;

  if (token) {
    redirect(ROUTES.dashboard);
  }

  return (
    <AuthShell
      eyebrow="Register"
      title="Create your DSA space"
      description="Set up your account and start tracking every topic with a cleaner workflow."
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerHref={ROUTES.login}
    >
      <RegisterForm />
    </AuthShell>
  );
}
