import { Module } from "@nestjs/common";
import { JobSeekerPostingService } from "./job-seeker-posting.service";
import { JobSeekerPostingController } from "./job-seeker-posting.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSeekerPosting } from "./entities/job-seeker-posting.entity";
import { JobSeekersModule } from "../job-seekers/job-seekers.module";
import { SkillsModule } from "../skills/skills.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([JobSeekerPosting]),
    JobSeekersModule,
    SkillsModule
  ],
  controllers: [JobSeekerPostingController],
  providers: [JobSeekerPostingService],
})
export class JobSeekerPostingModule {}
