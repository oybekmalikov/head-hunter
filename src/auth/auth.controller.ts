import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { UserAuthService } from "./user.auth.service";
import { CookieGetter } from "../common/decorators/decorators/cookie-getter.decorator";
import { Response } from "express";
import { SignInDto } from "./dto/sign-in.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: UserAuthService,
  ) { }

  // ______________________________USERS______________________________
  @ApiOperation({
    summary: "Login for users",
    description: "The user logs in through this endpoint!",
  })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully!",
    type: SignInDto,
  })
  @ApiResponse({
    status: 400,
    description: "Something went wrong!",
  })
  @ApiResponse({
    status: 403,
    description: "User already logged in!",
  })
  @ApiResponse({
    status: 404,
    description: "User not found!",
  })
  @HttpCode(200)
  @Post("user/sign-in")
  async signInUser(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

    @Post("user/sign-up")
  async signUpUser(
    @Body() signInDto: CreateUserDto,
  ) {
    return this.authService.signUp(signInDto);
  }

  @ApiOperation({
    summary: "Users log-out",
    description: "Users log out through this endpoint"
  })
  @ApiResponse({
    status: 200,
    description: "User logged out successfully!"
  })
  @ApiResponse({
    status: 400,
    description: "Something went wrong!"
  })
  @ApiResponse({
    status: 403,
    description: "User already logged out!"
  })
  @ApiResponse({
    status: 404,
    description: "User not found!"
  })
  @HttpCode(200)
  @Post("user/sign-out")
  async signOutUser(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @ApiOperation({
    summary: 'User refresh token',
    description: "The user renews their token through this endpoint."
  })
  @ApiResponse({
    status: 200,
    description: "User refreshed successfully!"
  })
  @ApiResponse({
    status: 400,
    description: "Something went wrong!"
  })
  @ApiResponse({
    status: 404,
    description: "User not found!"
  })
  @HttpCode(200)
  @Post("user/:id/refresh")
  refreshTokenUser(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(id, refreshToken, res);
  }

  @ApiOperation({
    summary: "User verify OTP",
    description: "The user verifies their OTP through this endpoint."
  })
  @ApiResponse({
    status: 200,
    description: "User verified successfully!"
  })
  @Post("user/verify-otp")
  async verifyOtp(
    @Body("email") email: string,
    @Body("userOtp") userOtp: string,
    @Body("type") type: "signup" | "forget-password",
  ) {
    return this.authService.verifyOtp(email, userOtp, type);
  }
  
  // ______________________________ADMINS______________________________
}