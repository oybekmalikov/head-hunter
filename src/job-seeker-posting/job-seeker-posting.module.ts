import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSeekersModule } from "../job-seekers/job-seekers.module";
import { SkillsModule } from "../skills/skills.module";
import { JobSeekerPosting } from "./entities/job-seeker-posting.entity";
import { JobSeekerPostingController } from "./job-seeker-posting.controller";
import { JobSeekerPostingService } from "./job-seeker-posting.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([JobSeekerPosting]),
    forwardRef(() => JobSeekersModule),
    SkillsModule,
  ],
  controllers: [JobSeekerPostingController],
  providers: [JobSeekerPostingService],
  exports: [JobSeekerPostingService],
})
export class JobSeekerPostingModule {}
