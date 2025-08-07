import { Module } from '@nestjs/common';
import { UserAuthService } from './user.auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [UserAuthService],
})
export class AuthModule { }
