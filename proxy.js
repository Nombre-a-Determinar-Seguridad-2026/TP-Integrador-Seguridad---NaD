import { auth0 } from '@/app/lib/auth0.js'

export async function proxy(request) {
  const authResponse = await auth0.middleware(request);

  // Always return the auth response.
  //
  // Note: The auth response forwards requests to your app routes by default.
  // If you need to block requests, do it before calling auth0.middleware() or
  // copy the authResponse headers except for x-middleware-next to your blocking response.
  return authResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

/*
This proxy automatically mounts the following authentication routes:
/auth/login - Login route
/auth/logout - Logout route
/auth/callback - Callback route
/auth/profile - User profile route
/auth/access-token - Access token route
/auth/backchannel-logout - Backchannel logout route
*/


/*
import { auth0 } from "./lib/auth0";

export async function proxy(request: Request) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
*/
