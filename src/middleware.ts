import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/lib/auth";

const PUBLIC_PREFIXES = ["/", "/about", "/services", "/contact", "/faq", "/login", "/signup", "/legal", "/investors", "/kyc", "/terms", "/api/auth", "/api/contact"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = decodeSession(token);
  const isAuthed = Boolean(session);

  if (pathname.startsWith("/dashboard")) {
    if (!isAuthed) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/dashboard/admin") && session?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if ((pathname === "/login" || pathname === "/signup") && isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
