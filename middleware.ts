import { withAuth } from "next-auth/middleware";

// Use withAuth to handle redirection to the login page for unauthenticated users
export default withAuth({
  pages: {
    signIn: "/login", // Redirects to `/login` if user is not authenticated
  },
});

// Middleware configuration to avoid applying to certain paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)", // Exclude public assets and API routes
  ],
};
