import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import * as otpGenerator from "otp-generator";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class MailService {
  constructor(
    private redisService: RedisService,
    private mailerService: MailerService,
  ) {}

  private generateOtp(): string {
    return otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }

  async sendOtp(
    email: string,
    type: "signup" | "forget-password",
  ): Promise<void> {
    const otp = this.generateOtp();
    const key = `otp:${type}:${email}`; // Key: otp:signup:email@example.com yoki otp:forget-password:email
    await this.redisService.set(key, otp, 180);

    const subject =
      type === "signup" ? "Sign Up Verification OTP" : "Password Reset OTP";
    await this.mailerService.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      html: createOTPEmail(otp, subject, type),
    });
  }

  async verifyOtp(
    email: string,
    userOtp: string,
    type: "signup" | "forget-password",
  ): Promise<boolean> {
    const key = `otp:${type}:${email}`;
    const storedOtp = await this.redisService.get(key);

    if (storedOtp && storedOtp === userOtp) {
      await this.redisService.delete(key); // Muvaffaqiyatli bo'lsa o'chirish
      return true;
    }
    return false;
  }
}

const createOTPEmail = (
  otp: string,
  subject = "Head Hunter - Verification Code",
  type = "signup",
) => {
  const config = {
    signup: {
      title: "Welcome to Head Hunter!",
      description:
        "Thank you for joining Head Hunter! Please verify your email address using the code below to complete your account setup and start your career journey.",
      codeLabel: "Enter this code to activate your account",
      securityIcon: "✓",
      securityBg: "#ecfdf5",
      securityBorder: "#10b981",
      securityIconBg: "#10b981",
      securityTextColor: "#065f46",
      securityTitle: "Account Security",
      securityText:
        "This code will expire in 3 minutes. Keep your account secure by never sharing verification codes.",
      footerText: "This email was sent to verify your Head Hunter account.",
    },
    "forgot-password": {
      title: "Reset Your Password",
      description:
        "We received a request to reset your Head Hunter account password. Please use the verification code below to proceed with resetting your password.",
      codeLabel: "Enter this code to reset your password",
      securityIcon: "🔒",
      securityBg: "#fef3cd",
      securityBorder: "#f59e0b",
      securityIconBg: "#f59e0b",
      securityTextColor: "#92400e",
      securityTitle: "Password Reset Security",
      securityText:
        "This code will expire in 3 minutes. If you didn't request a password reset, please ignore this email.",
      footerText:
        "This email was sent for your Head Hunter password reset request.",
    },
  };

  const currentConfig = config[type] || config.signup;

  return `
    <div style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Head Hunter</h1>
          <p style="color: #e2e8f0; margin: 8px 0 0; font-size: 16px; font-weight: 400;">Connecting Talent with Opportunity</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 50px 40px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">${currentConfig.title}</h2>
            <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.6;">
              ${currentConfig.description}
            </p>
          </div>

          <!-- OTP Code -->
          <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 30px; text-align: center; margin: 30px 0; position: relative;">
            <p style="color: #475569; margin: 0 0 12px; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Verification Code</p>
            <div style="background-color: #ffffff; border: 2px solid #667eea; border-radius: 12px; padding: 20px; margin: 0 auto; display: inline-block; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);">
              <span style="color: #667eea; font-size: 32px; font-weight: 700; letter-spacing: 4px; font-family: 'Courier New', monospace;">${otp}</span>
            </div>
            <p style="color: #64748b; margin: 16px 0 0; font-size: 13px;">${currentConfig.codeLabel}</p>
          </div>

          <!-- Security Info -->
          <div style="background-color: ${currentConfig.securityBg}; border: 1px solid ${currentConfig.securityBorder}; border-radius: 12px; padding: 20px; margin: 30px 0;">
            <table style="width: 100%;">
              <tr>
                <td style="width: 32px; vertical-align: top; padding-right: 12px;">
                  <div style="background-color: ${currentConfig.securityIconBg}; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                    <span style="color: #ffffff; font-size: 12px; font-weight: bold;">${currentConfig.securityIcon}</span>
                  </div>
                </td>
                <td>
                  <p style="color: ${currentConfig.securityTextColor}; margin: 0; font-size: 14px; font-weight: 600;">${currentConfig.securityTitle}</p>
                  <p style="color: ${currentConfig.securityTextColor}; margin: 8px 0 0; font-size: 14px; line-height: 1.5;">${currentConfig.securityText}</p>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1e293b; padding: 30px 40px; text-align: center;">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #ffffff; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Head Hunter</h3>
            <p style="color: #94a3b8; margin: 0; font-size: 13px;">Building bridges between talent and opportunity</p>
          </div>
          
          <div style="border-top: 1px solid #334155; padding-top: 20px;">
            <p style="color: #64748b; margin: 0; font-size: 12px; line-height: 1.5;">
              ${currentConfig.footerText}<br>
              © 2025 Head Hunter. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};
