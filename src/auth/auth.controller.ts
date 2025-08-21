import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/decorators/cookie-getter.decorator";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { UserAuthService } from "./user.auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: UserAuthService) {}

  @ApiOperation({
    summary: "Login for users",
    description: "The user logs in through this endpoint!",
  })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully!",
    type: SignInDto,
  })
  @HttpCode(200)
  @Post("user/sign-in")
  async signInUser(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @Post("user/sign-up")
  async signUpUser(@Body() signInDto: CreateUserDto) {
    return this.authService.signUp(signInDto);
  }

  @ApiOperation({
    summary: "Users log-out",
    description: "Users log out through this endpoint",
  })
  @ApiResponse({
    status: 200,
    description: "User logged out successfully!",
  })
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post("user/sign-out")
  async signOutUser(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @ApiOperation({
    summary: "User refresh token",
    description: "The user renews their token through this endpoint.",
  })
  @ApiResponse({
    status: 200,
    description: "User refreshed successfully!",
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post("user/:id/refresh")
  refreshTokenUser(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokenUser(id, refreshToken, res);
  }

  @ApiOperation({
    summary: "User verify OTP",
    description: "The user verifies their OTP through this endpoint.",
  })
  @ApiResponse({
    status: 200,
    description: "User verified successfully!",
  })
  @HttpCode(200)
  @Post("user/verify-otp")
  async verifyOtp(
    @Body("email") email: string,
    @Body("otp") userOtp: string,
    @Body("type") type: "signup" | "forget-password",
  ) {
    return this.authService.verifyOtp(email, userOtp, type);
  }

  @ApiOperation({
    summary: "User forget password",
    description: "The user forgets their password through this endpoint.",
  })
  @ApiResponse({
    status: 200,
    description: "User forgot password successfully!",
  })
  @HttpCode(200)
  @Post("user/forget-password")
  async forgetPassword(@Body("email") email: string) {
    return this.authService.forgetPassword(email);
  }

  @ApiOperation({
    summary: "User reset password",
    description: "The user resets their password through this endpoint.",
  })
  @ApiResponse({
    status: 200,
    description: "User reset password successfully!",
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post("user/reset-password")
  async resetPassword(
    @Body("email") email: string,
    @Body("newPassword") password: string,
    @Body("confirmPassword") confirmPassword: string,
  ) {
    return this.authService.resetPassword(email, password, confirmPassword);
  }

  @ApiOperation({
    summary: "User new password",
    description: "The user get new password through this endpoint.",
  })
  @ApiResponse({
    status: 200,
    description: "User new password successfully!",
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post("user/update-password")
  async newPassword(
    @Body("oldPassword") oldPassword: string,
    @Body("newPassword") newPassword: string,
    @Body("confirmPassword") confirmPassword: string,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    return this.authService.updatePassword(
      oldPassword,
      newPassword,
      confirmPassword,
      user.id,
    );
  }
}
