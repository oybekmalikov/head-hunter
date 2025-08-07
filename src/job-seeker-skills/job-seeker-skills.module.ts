import { Module } from "@nestjs/common";
import { JobSeekerSkillsService } from "./job-seeker-skills.service";
import { JobSeekerSkillsController } from "./job-seeker-skills.controller";
import { SkillModule } from "src/skill/skill.module";
import { JobSeekerModule } from "src/job-seeker/job-seeker.module";

@Module({
  imports: [SkillModule, JobSeekerModule],
  controllers: [JobSeekerSkillsController],
  providers: [JobSeekerSkillsService],
  exports: [JobSeekerSkillsService],
})
export class JobSeekerSkillsModule {}
