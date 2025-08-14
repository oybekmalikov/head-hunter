import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSeeker } from "./entities/job-seeker.entity";
import { JobSeekersController } from "./job-seekers.controller";
import { JobSeekersService } from "./job-seekers.service";

@Module({
  imports: [TypeOrmModule.forFeature([JobSeeker]),
  
  ],
  controllers: [JobSeekersController],
  providers: [JobSeekersService],
  exports: [JobSeekersService],
})
export class JobSeekersModule {}
