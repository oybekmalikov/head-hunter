import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSeekersModule } from "../job-seekers/job-seekers.module";
import { EduController } from "./edu.controller";
import { EduService } from "./edu.service";
import { Edu } from "./entities/edu.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Edu]), JobSeekersModule],
  controllers: [EduController],
  providers: [EduService],
  exports: [EduService],
})
export class EduModule {}
