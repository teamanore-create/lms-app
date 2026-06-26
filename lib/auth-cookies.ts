const isProduction = process.env.NODE_ENV === "production";

import { NextResponse } from "next/server";
import { TOKEN_EXPIRY } from "./auth-utils";

export function setAuthCookies(
  response: NextResponse,
  // accessToken: string,
  refreshToken: string
) {

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: TOKEN_EXPIRY.REFRESH_TOKEN / 1000,
  });

  return response;
}