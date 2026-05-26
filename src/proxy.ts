import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es", "pt"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude static assets, API paths, and internal Next.js requests
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".") || // e.g. favicon.ico, og-image.png
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Check if the path already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it has a locale, extract it and rewrite the path internally to the non-locale page
    const segments = pathname.split("/");
    const locale = segments[1];
    
    // Construct internal path by removing the locale prefix
    const internalPath = "/" + segments.slice(2).join("/");
    
    const url = request.nextUrl.clone();
    url.pathname = internalPath;
    url.searchParams.set("lang", locale); // Set lang query param so pages can detect it
    
    const response = NextResponse.rewrite(url);
    response.headers.set("x-locale", locale);
    return response;
  }

  // 3. No locale prefix. Detect the user's preferred locale
  // Check cookie first
  let locale = request.cookies.get("lang")?.value;

  if (!locale || !locales.includes(locale)) {
    // Detect from Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      if (acceptLanguage.includes("es")) {
        locale = "es";
      } else if (acceptLanguage.includes("pt")) {
        locale = "pt";
      } else {
        locale = defaultLocale;
      }
    } else {
      locale = defaultLocale;
    }
  }

  // 4. Redirect to the localized path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  
  const response = NextResponse.redirect(url);
  // Persist detected locale in a cookie
  response.cookies.set("lang", locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax",
  });
  
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next) and assets, but catch everything else
    "/((?!_next/static|_next/image|assets|favicon.ico|.*\\..*).*)",
  ],
};
