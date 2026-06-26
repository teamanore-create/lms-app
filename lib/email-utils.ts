import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const fromAddress = process.env.SMTP_FROM || 'noreply@example.com';

function createTransport() {
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
  });
}

export async function sendOtpEmail(email: string, otp: string) {
  const transporter = createTransport();

  const info = await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: 'Your BIM Training Verification Code',
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2>Your BIM Training verification code</h2>
        <p>Use the code below to verify your email address:</p>
        <div style="margin: 24px 0; padding: 16px; background: #f8fafc; border-radius: 12px; display: inline-block; font-size: 28px; letter-spacing: 0.2em;">
          <strong>${otp}</strong>
        </div>
        <p>This code expires in 10 minutes.</p>
      </div>
    `,
  });

  return info;
}
