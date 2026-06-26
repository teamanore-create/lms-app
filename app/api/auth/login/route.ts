import prisma from "@/lib/db";
import {
  verifyPassword,
  generateToken,
  hashToken,
  generateJWTPayload,
  TOKEN_EXPIRY,
  extractDeviceInfo,
} from "@/lib/auth-utils";
import { loginSchema } from "@/schemas/auth.schema";
import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth-cookies";

const MAX_DEVICES = 2;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, password } = result.data;
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Get active sessions count
    const activeSessions = await prisma.session.findMany({
      where: {
        userId: user.id,
        isActive: true,
      },
      orderBy: { createdAt: "asc" },
    });

    // If at max devices, delete the oldest session
    if (activeSessions.length >= MAX_DEVICES) {
      await prisma.session.update({
        where: { id: activeSessions[0].id },
        data: { isActive: false },
      });
    }

    // Extract device info
    const deviceInfo = extractDeviceInfo(request);

    // Create new session
    const refreshToken = generateToken();
    const refreshTokenHash = hashToken(refreshToken);

    const accessTokenExpiry = new Date(Date.now() + TOKEN_EXPIRY.ACCESS_TOKEN);
    const refreshTokenExpiry = new Date(
      Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN,
    );

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash,
        accessTokenExp: accessTokenExpiry,
        refreshTokenExp: refreshTokenExpiry,
        ...deviceInfo,
      },
    });

    // Generate tokens
    const accessToken = generateJWTPayload(
      {
        userId: user.id,
        sessionId: session.id,
        email: user.email,
        type: "access",
      },
      TOKEN_EXPIRY.ACCESS_TOKEN,
    );

    const refreshTokenJWT = generateJWTPayload(
      {
        userId: user.id,
        sessionId: session.id,
        type: "refresh",
      },
      TOKEN_EXPIRY.REFRESH_TOKEN,
    );

    const response = NextResponse.json(
      {
        success: true,
        accessToken: accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        session: {
          id: session.id,
          deviceName: session.deviceName,
          createdAt: session.createdAt,
        },
      },
      { status: 200 },
    );

    return setAuthCookies(
      response,
      refreshTokenJWT
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
