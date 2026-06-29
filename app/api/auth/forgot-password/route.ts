import prisma from "@/lib/db";
import { generateOtp, hashOtp } from "@/lib/auth-utils";
import { sendOtpEmail } from "@/lib/email-utils";
import { forgotPasswordSchema } from "@/schemas/auth.schema";

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email } = result.data;
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return a neutral response to prevent account enumeration.
    if (!user) {
      return new Response(
        JSON.stringify({
          success: true,
          message:
            "If an account exists for that email, a reset code has been sent.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    await prisma.verificationToken.upsert({
      where: { email },
      update: {
        type: "forgot-password",
        hashedOtp,
        expiresAt,
        hashedPassword: "",
        firstName: "N/A",
        lastName: null,
      },
      create: {
        email,
        type: "forgot-password",
        hashedPassword: "",
        firstName: "N/A",
        lastName: null,
        hashedOtp,
        expiresAt,
      },
    });

    await sendOtpEmail(email, otp, "password-reset");

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "If an account exists for that email, a reset code has been sent.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
