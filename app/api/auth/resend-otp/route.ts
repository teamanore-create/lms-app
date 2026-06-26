import prisma from '@/lib/db';
import { generateOtp, hashOtp } from '@/lib/auth-utils';
import { sendOtpEmail } from '@/lib/email-utils';

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const verification = await prisma.verificationToken.findUnique({
      where: { email },
    });

    if (!verification) {
      return new Response(
        JSON.stringify({ error: 'No pending verification found for this email' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    await prisma.verificationToken.update({
      where: { email },
      data: {
        hashedOtp,
        expiresAt,
      },
    });

    await sendOtpEmail(email, otp);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'A new OTP has been sent to your email.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Resend OTP error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
