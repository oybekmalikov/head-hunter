import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Notification } from "../notifications/entities/notification.entity";
import { EmployersController } from "./employers.controller";
import { EmployersService } from "./employers.service";
import { Employer } from "./entities/employer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Employer, Notification]), UsersModule],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService],
})
export class EmployersModule {}
