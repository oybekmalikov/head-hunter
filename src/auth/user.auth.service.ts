import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class UserAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailService,
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      jobSeekerId: user.jobSeekers[0]?.id,
      employerId: user.employers[0]?.id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(signInDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (user) {
      throw new BadRequestException("Email already exists!");
    }
    return {
      data: await this.usersService.create(signInDto),
      message: "Please check your email for OTP",
      success: true,
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException("Email or password incorrect!1");
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email or password incorrect!2");
    }
    if (
      user.role === "employer" &&
      (!user.employers[0].isVerifiedByAdmin || !user.isActive)
    ) {
      throw new BadRequestException("Please wait for admin approval");
    }
    if (user.role === "jobSeeker" && !user.isActive) {
      throw new BadRequestException("Please verify your email");
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    await this.usersService.updateRefreshToken(user.id, refreshToken);
    return {
      message: "User logged in successfully!",
      accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("Unauthorized user!");
    }
    const user = await this.usersService.findByEmail(userData.email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    refreshToken = "";
    await this.usersService.deActivate(user.id);
    await this.usersService.updateRefreshToken(user.id, refreshToken);
    res.clearCookie("refresh_token");
    return {
      message: "User logged out succesfully!",
    };
  }

  async refreshTokenUser(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan foydalanuvchi!");
    }
    const user = await this.usersService.findOne(userId);
    if (!user && !user) {
      throw new NotFoundException("User not found");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user.data!);
    await this.usersService.updateRefreshToken(user.data!.id, refreshToken);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: "User refreshed successfully!",
      userId: user.data!.id,
      accessToken,
    };
  }

  async verifyOtp(
    email: string,
    userOtp: string,
    type: "signup" | "forget-password",
  ) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const isOtpValid = await this.mailerService.verifyOtp(email, userOtp, type);
    if (!isOtpValid) {
      throw new BadRequestException("Invalid OTP");
    }
    if (type === "signup") {
      await this.usersService.activate(user.id);
    }
    return {
      message: "OTP verified successfully!",
      data: { email: user.email, type: type, succesfully: true },
      success: true,
    };
  }

  async forgetPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    try {
      await this.mailerService.sendOtp(email, "forget-password");
      return {
        message: "Please check your email for OTP",
        data: { email: user.email, type: "forget-password", succesfully: true },
        success: true,
      };
    } catch (error) {
      throw new BadRequestException("Failed to send OTP");
    }
  }

  async resetPassword(
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (password !== confirmPassword) {
      throw new BadRequestException(
        "Password and confirm password do not match",
      );
    }
    const response = await this.usersService.updatePassword(user.id, password);
    return {
      message: response.message,
      success: response.success,
    };
  }

  async updatePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    userId: number,
  ) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const isValidPassword = await bcrypt.compare(
      oldPassword,
      user.data!.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException("Old password is incorrect");
    }
    if (newPassword !== confirmPassword) {
      throw new BadRequestException(
        "New password and confirm password do not match",
      );
    }
    const response = await this.usersService.updatePassword(
      userId,
      newPassword,
    );
    return {
      message: response.message,
      data: { userId },
      success: response.success,
    };
  }
}
