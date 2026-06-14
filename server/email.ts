import nodemailer from "nodemailer";

const gmailUser = process.env.GMAIL_USER;
const gmailAppPass = process.env.GMAIL_APP_PASS;

// Construct dynamic appUrl for local and Vercel environments
const appUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : (process.env.APP_URL || "http://localhost:3000");

// Initialize transporter only if credentials are provided
let transporter: nodemailer.Transporter | null = null;
if (gmailUser && gmailAppPass) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPass,
    },
  });
}

export async function sendVerificationEmail(email: string, name: string, token: string): Promise<string> {
  // Use underscore `/verify_email` to match updated backend routes
  const verificationLink = `${appUrl}/api/auth/verify_email?token=${token}`;
  
  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-bottom: 16px;">Verifikasi Email Anda</h2>
      <p style="color: #475569; font-size: 16px; line-height: 24px;">Halo ${name},</p>
      <p style="color: #475569; font-size: 16px; line-height: 24px;">Terima kasih telah mendaftar di <strong>OptimaData</strong>. Silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda:</p>
      <div style="margin: 24px 0;">
        <a href="${verificationLink}" style="background-color: #06b6d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verifikasi Email</a>
      </div>
      <p style="color: #64748b; font-size: 14px; line-height: 20px;">Jika tombol di atas tidak berfungsi, Anda juga dapat menyalin dan menempelkan tautan berikut ke browser Anda:</p>
      <p style="color: #06b6d4; font-size: 14px; word-break: break-all;"><a href="${verificationLink}">${verificationLink}</a></p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="color: #94a3b8; font-size: 12px; line-height: 16px;">Tautan ini akan kedaluwarsa dalam 24 jam. Jika Anda tidak merasa mendaftar di OptimaData, silakan abaikan email ini.</p>
    </div>
  `;

  if (transporter && gmailUser) {
    try {
      // strictly await the sendMail operation so Vercel serverless doesn't freeze the process
      await transporter.sendMail({
        from: `"OptimaData" <${gmailUser}>`,
        to: email,
        subject: "Verifikasi Akun OptimaData Anda",
        text: `Halo ${name},\n\nTerima kasih telah mendaftar di OptimaData. Silakan kunjungi tautan berikut untuk memverifikasi email Anda:\n\n${verificationLink}`,
        html: htmlContent,
      });
      console.log(`[Email Service] Verification email successfully sent to ${email} via Gmail SMTP`);
      return verificationLink;
    } catch (error) {
      console.error("[Email Service] Failed to send email via Gmail SMTP:", error);
      console.log(`[Email Service Fallback] Tautan verifikasi untuk ${email}: ${verificationLink}`);
      return verificationLink;
    }
  } else {
    console.log(`[Email Service Mock] Gmail SMTP credentials (GMAIL_USER/GMAIL_APP_PASS) are not configured.`);
    console.log(`[Email Service Mock] Tautan verifikasi untuk ${email}: ${verificationLink}`);
    return verificationLink;
  }
}
