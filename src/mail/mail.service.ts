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
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${subject}</h2>
          <p>Your verification code is:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in 2 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
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
