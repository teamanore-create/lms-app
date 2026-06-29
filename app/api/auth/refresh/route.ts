import prisma from "@/lib/db";

import {
  verifyJWTToken,
  generateToken,
  hashToken,
  generateJWTPayload,
  TOKEN_EXPIRY,
} from "@/lib/auth-utils";
import { NextResponse, NextRequest } from "next/server";
import { setAuthCookies } from "@/lib/auth-cookies";

export async function POST(request: NextRequest) {
  try {
    // Read refresh token from httpOnly cookie (secure pattern)
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return new Response(
        JSON.stringify({ error: "Refresh token is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Verify refresh token
    const payload = verifyJWTToken(refreshToken);

    if (
      !payload ||
      payload.type !== "refresh" ||
      !payload.userId ||
      !payload.sessionId
    ) {
      return new Response(JSON.stringify({ error: "Invalid refresh token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify session exists and is active
    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session not found or expired" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check if refresh token is expired
    if (session.refreshTokenExp < new Date()) {
      return new Response(JSON.stringify({ error: "Refresh token expired" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate new tokens
    const newRefreshToken = generateToken();
    const newRefreshTokenHash = hashToken(newRefreshToken);

    const accessTokenExpiry = new Date(Date.now() + TOKEN_EXPIRY.ACCESS_TOKEN);
    const refreshTokenExpiry = new Date(
      Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN,
    );

    // Update session with new token hash and expiry
    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshTokenHash: newRefreshTokenHash,
        accessTokenExp: accessTokenExpiry,
        refreshTokenExp: refreshTokenExpiry,
        lastUsedAt: new Date(),
      },
    });

    // Generate new access token
    const newAccessToken = generateJWTPayload(
      {
        userId: session.userId,
        sessionId: session.id,
        email: session.user.email,
        type: "access",
      },
      TOKEN_EXPIRY.ACCESS_TOKEN,
    );

    // Generate new refresh token JWT
    const newRefreshTokenJWT = generateJWTPayload(
      {
        userId: session.userId,
        sessionId: session.id,
        type: "refresh",
      },
      TOKEN_EXPIRY.REFRESH_TOKEN,
    );

    const response = NextResponse.json(
      {
        success: true,
        accessToken: newAccessToken,
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        },
        session: {
          id: session.id,
          deviceName: session.deviceName,
          createdAt: session.createdAt,
        },
      },
      { status: 200 },
    );
    return setAuthCookies(response, newRefreshTokenJWT);
  } catch (error) {
    console.error("Refresh token error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}