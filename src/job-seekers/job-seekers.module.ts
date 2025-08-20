import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSeeker } from "./entities/job-seeker.entity";
import { JobSeekersController } from "./job-seekers.controller";
import { JobSeekersService } from "./job-seekers.service";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([JobSeeker]), UsersModule],
  controllers: [JobSeekersController],
  providers: [JobSeekersService],
  exports: [JobSeekersService],
})
export class JobSeekersModule {}
