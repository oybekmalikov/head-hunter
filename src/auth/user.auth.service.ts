import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class UserAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
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

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException("Email already exists!");
    }
    return this.usersService.create(createUserDto);
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
        throw new BadRequestException("Email or password incorrect!1");
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );
    if (!isValidPassword) {
        throw new BadRequestException("Email or password incorrect!2");
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
    if (!user && !user!) {
      throw new NotFoundException("User not found");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user.user!);
    await this.usersService.updateRefreshToken(user.user!.id, refreshToken);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: "User refreshed successfully!",
      userId: user.user!.id,
      access_token: accessToken,
      success: true,
    };  
  }
}
