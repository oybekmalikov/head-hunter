import { Module } from "@nestjs/common";
import { EduService } from "./edu.service";
import { EduController } from "./edu.controller";
import { JobSeekersModule } from "../job-seekers/job-seekers.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Edu } from "./entities/edu.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Edu]),
    JobSeekersModule
  ],
  controllers: [EduController],
  providers: [EduService],
})
export class EduModule {}
