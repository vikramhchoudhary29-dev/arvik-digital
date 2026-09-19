import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/auth-token";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;
    const admin = await verifyAdminToken(token);

    if (!admin) {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("next", pathname);

      const response = NextResponse.redirect(url);
      response.cookies.set("admin_token", "", {
        path: "/",
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
