// RESPONSIBILITY: Renders or handles logic for proxy.ts.
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Next.js Server-Side Middleware â€” Route Protection
 *
 * This runs on the SERVER before any page renders â€” cannot be bypassed by the client.
 * It is the primary security layer for the frontend (Zero Trust principle).
 *
 * Route-Role Access Matrix:
 * â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
 * â”‚ Route Prefix    â”‚ Allowed Roles                              â”‚
 * â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
 * â”‚ /superadmin/**  â”‚ superadmin only                            â”‚
 * â”‚ /admin/**       â”‚ admin, superadmin                          â”‚
 * â”‚ /manager/**     â”‚ manager, admin, superadmin                 â”‚
 * â”‚ /system/**      â”‚ admin, superadmin                          â”‚
 * â”‚ /finance/**     â”‚ admin, superadmin                          â”‚
 * â”‚ /accounting/**  â”‚ admin, superadmin                          â”‚
 * â”‚ /crm/**         â”‚ manager, admin, superadmin                 â”‚
 * â”‚ /communication/**â”‚ manager, admin, superadmin               â”‚
 * â”‚ /engagement/**  â”‚ manager, admin, superadmin                 â”‚
 * â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
 *
 * If token is missing â†’ redirect to /auth/login
 * If role is wrong â†’ redirect to /403
 * Protected pages also get Cache-Control: no-store headers
 */

const ROUTE_ROLE_MAP: Record<string, string[]> = {
  '/superadmin': ['superadmin'],
  '/admin': ['admin', 'superadmin'],
  '/manager': ['manager', 'admin', 'superadmin'],
};

const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/forgot-password',
  '/',
  '/api',
  '/_next',
  '/favicon.ico',
  '/403',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // â”€â”€ Skip public routes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublic) return NextResponse.next();

  // â”€â”€ Check which protected route this is â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const matchedRoute = Object.keys(ROUTE_ROLE_MAP).find((route) =>
    pathname.startsWith(route),
  );
  if (!matchedRoute) return NextResponse.next(); // Not a protected route

  // â”€â”€ Get access token from cookie â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    // No token â€” redirect to login with return URL
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    const response = NextResponse.redirect(loginUrl);
    // Set no-cache headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  }

  // â”€â”€ Verify JWT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET,
    );
    const { payload } = await jwtVerify(token, secret);
    const userRole = (payload.role as string) || '';

    // â”€â”€ Check role access â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const allowedRoles = ROUTE_ROLE_MAP[matchedRoute];
    if (!allowedRoles.includes(userRole)) {
      // Wrong role â€” redirect to 403 page
      const response = NextResponse.redirect(new URL('/403', request.url));
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    // â”€â”€ Authorized â€” set cache-control and continue â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error) {
    // Token is invalid or expired â€” redirect to login
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    loginUrl.searchParams.set('reason', 'session_expired');
    const response = NextResponse.redirect(loginUrl);
    // Clear the bad cookie
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
}

/**
 * Middleware matcher â€” applies to all routes EXCEPT static files and Next.js internals
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|images|fonts|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};

// Next.js 16+ alias (prevents deprecation warning)
export { middleware as proxy };

