import prisma from "@/lib/db";
import {
  verifyOtp,
  generateToken,
  hashToken,
  generateJWTPayload,
  TOKEN_EXPIRY,
  extractDeviceInfo,
} from "@/lib/auth-utils";
import { verifyOtpSchema } from "@/schemas/auth.schema";
import { setAuthCookies } from "@/lib/auth-cookies";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = verifyOtpSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, otp } = result.data;
    const verification = await prisma.verificationToken.findUnique({
      where: { email },
    });

    if (!verification) {
      return new Response(
        JSON.stringify({ error: "Verification record not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    if (verification.expiresAt < new Date()) {
      return new Response(
        JSON.stringify({
          error: "OTP has expired. Please request a new code.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!verifyOtp(otp, verification.hashedOtp)) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          error: "A verified user already exists for this email",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    const userName =
      `${verification.firstName}${verification.lastName ? ` ${verification.lastName}` : ""}`.trim();

    const user = await prisma.user.create({
      data: {
        email,
        password: verification.hashedPassword,
        name: userName,
      },
    });

    await prisma.verificationToken.delete({
      where: { email },
    });

    const deviceInfo = extractDeviceInfo(request);
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
    return setAuthCookies(response, refreshTokenJWT);
  } catch (error) {
    console.error("Verify OTP error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}