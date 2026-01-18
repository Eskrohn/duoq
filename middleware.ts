import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "./auth";

type AuthRequest = NextRequest & {
  auth: {
    user?: unknown;
  } | null;
};

export default auth((req: AuthRequest) => {
  if (!req.auth) {
    const signinUrl = new URL("/signin", req.nextUrl.origin);
    signinUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signinUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/profile/:path*",
    "/discover/:path*",
    "/matches/:path*",
    "/chat/:path*",
    "/settings/:path*",
  ],
};
