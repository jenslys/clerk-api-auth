import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// https://clerk.com/docs/references/nextjs/auth-middleware

export default authMiddleware({
  publicRoutes: ["/", "/not-found"],
  debug: true,
  afterAuth(auth, req, evt) {
    console.log("AFTER AUTH", auth);
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      console.log("AFTER AUTH: redirection to sign");
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Redirect logged in users to organization selection page if they are not active in an organization
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/setup") {
      console.log(
        "AFTER AUTH: User signed in, but no orgId. Redirect to /setup"
      );
      const orgSelection = new URL("/setup", req.url);
      return NextResponse.redirect(orgSelection);
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      console.log(
        "AFTER AUTH: User signed in + protected route - send to route"
      );
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    console.log("AFTER AUTH: Public route -- send to route");
    return NextResponse.next();
  },
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
