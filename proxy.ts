import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_KEY } from "@/lib/constants";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_KEY)?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/topics");
  const isGuestRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/topics/:path*"],
};
