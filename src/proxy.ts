import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isAppAdmin } from "@/lib/auth";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about(.*)",
  "/services(.*)",
  "/contact(.*)",
  "/faq(.*)",
  "/legal(.*)",
  "/investors(.*)",
  "/kyc(.*)",
  "/terms(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/contact(.*)",
  "/api/email(.*)",
]);

const isAdminRoute = createRouteMatcher(["/dashboard/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) return;

  await auth.protect();

  if (isAdminRoute(request)) {
    const user = await isAppAdmin(await auth());
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk(.*)",
  ],
};
