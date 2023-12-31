import { NextResponse } from 'next/server'

const defaultLocale = 'vi'
let locales = ['en', 'kr', 'ch']

export function middleware(request) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname

    // Check if the default locale is in the pathname
    if (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`) {
        // e.g. incoming request is /en/products
        // The new URL is now /products
        return NextResponse.redirect(
            new URL(pathname.replace(`/${defaultLocale}`, pathname === `/${defaultLocale}` ? '/' : ''), request.url),
        )
    }

    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    )

    if (pathnameIsMissingLocale) {
        // We are on the default locale
        // Rewrite so Next.js understands

        // e.g. incoming request is /products
        // Tell Next.js it should pretend it's /en/products
        return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, request.url))
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
    ],
}
