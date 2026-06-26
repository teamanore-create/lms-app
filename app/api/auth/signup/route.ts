import prisma from "@/lib/db";
import { hashPassword, generateOtp, hashOtp } from "@/lib/auth-utils";
import { sendOtpEmail } from "@/lib/email-utils";
import { signupSchema } from "@/schemas/auth.schema";

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, password, firstName, lastName } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User with this email already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);
    const hashedPassword = hashPassword(password);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    // what if user Waits 5 minutes and clicks signup again
    await prisma.verificationToken.upsert({
      where: { email },
      update: {
        hashedPassword,
        firstName: firstName,
        lastName: lastName || null,
        hashedOtp,
        expiresAt,
      },
      create: {
        email,
        type: "signup",
        hashedPassword,
        firstName: firstName || "N/A",
        lastName: lastName || null,
        hashedOtp,
        expiresAt,
      },
    });

    await sendOtpEmail(email, otp);

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Verification OTP sent to email. Complete signup by verifying OTP.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Signup OTP error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
