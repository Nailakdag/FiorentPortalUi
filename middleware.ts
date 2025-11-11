import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import * as ROUTES from "@/contants/routes";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith(ROUTES.LOGIN);

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(ROUTES.WORK_ORDER, req.url));
      }

      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL(`${ROUTES.LOGIN}`, req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|favicon.ico|logo.png|sw.js).*)",
  ],
};
