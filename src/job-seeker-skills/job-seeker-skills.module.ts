import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSeekersModule } from "../job-seekers/job-seekers.module";
import { SkillsModule } from "../skills/skills.module";
import { JobSeekerSkill } from "./entities/job-seeker-skill.entity";
import { JobSeekerSkillsController } from "./job-seeker-skills.controller";
import { JobSeekerSkillsService } from "./job-seeker-skills.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([JobSeekerSkill]),
    SkillsModule,
    JobSeekersModule,
  ],
  controllers: [JobSeekerSkillsController],
  providers: [JobSeekerSkillsService],
  exports: [JobSeekerSkillsService],
})
export class JobSeekerSkillsModule {}
