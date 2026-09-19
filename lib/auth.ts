import { cookies } from "next/headers";
import { verifyAdminToken, createAdminToken, TOKEN_TTL } from "@/lib/auth-token";
export { verifyAdminToken, createAdminToken };
const COOKIE_NAME="admin_token";
export async function getAdminFromCookies(){const store=await cookies();return verifyAdminToken(store.get(COOKIE_NAME)?.value);}
export async function requireAdmin(){const admin=await getAdminFromCookies();if(!admin)throw new Error("UNAUTHORIZED");return admin;}
export const adminCookieOptions={httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax" as const,path:"/",maxAge:TOKEN_TTL};
