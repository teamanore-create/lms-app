import prisma from "@/lib/db";
import { hashPassword, verifyOtp } from "@/lib/auth-utils";
import { resetPasswordSchema } from "@/schemas/auth.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, otp, password } = result.data;
    const verification = await prisma.verificationToken.findUnique({
      where: { email },
    });

    if (
      !verification ||
      verification.type !== "forgot-password" ||
      verification.expiresAt < new Date()
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired reset code." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!verifyOtp(otp, verification.hashedOtp)) {
      return new Response(
        JSON.stringify({ error: "Invalid reset code." }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const newPasswordHash = hashPassword(password);

    await prisma.user.update({
      where: { email },
      data: { password: newPasswordHash },
    });

    await prisma.verificationToken.delete({ where: { email, type: "forgot-password" } });

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Password has been reset successfully. Please sign in with your new password.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
