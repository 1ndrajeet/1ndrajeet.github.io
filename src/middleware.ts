import { clerkClient as getClerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedApiRoute = createRouteMatcher(['/api/batcave(.*)']);
const isProtectedRoute = createRouteMatcher(['/batcave(.*)']);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    // Handle protected API routes (/api/batcave/*)
  if (isProtectedApiRoute(req)) {
    const isBrowser = req.headers.get('sec-fetch-mode') === 'navigate';
    if (isBrowser) {
      return new Response('Access denied', { status: 403 });
    }
    if (req.headers.get('x-app-request') !== 'internal') {
      await auth.protect();
    }
    return;
  }

  // Protect non-public routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Check access to /batcave
  if (req.nextUrl.pathname.includes('/batcave') && userId) {
    const clerkClient = await getClerkClient();
    const user = await clerkClient.users.getUser(userId);

    const userEmail = user.emailAddresses?.[0]?.emailAddress;

    if (userEmail !== "omkar.kulkarni.3174@gmail.com") {
      return NextResponse.redirect(new URL('/arkham', req.url));
    }   
  } 
   if (req.nextUrl.pathname.includes('/arkham') && userId) {
    const clerkClient = await getClerkClient();
    const user = await clerkClient.users.getUser(userId);

    const userEmail = user.emailAddresses?.[0]?.emailAddress;

    if (userEmail === "omkar.kulkarni.3174@gmail.com") {
      return NextResponse.redirect(new URL('/batcave', req.url));
    }   
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
  ],
};