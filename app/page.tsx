import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_KEY, ROUTES } from "@/lib/constants";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_KEY)?.value;

  redirect(token ? ROUTES.dashboard : ROUTES.login);
}
