import prisma from "@/lib/db";
import { verifyJWTToken } from "@/lib/auth-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: "Access token is required" },
        { status: 401 },
      );
    }

    const payload = verifyJWTToken(accessToken);

    if (
      !payload ||
      payload.type !== "access" ||
      !payload.userId ||
      !payload.sessionId
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired access token" },
        { status: 401 },
      );
    }

    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
    });

    if (!session || session.accessTokenExp < new Date()) {
      return NextResponse.json(
        { success: false, error: "Session not found or expired" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
