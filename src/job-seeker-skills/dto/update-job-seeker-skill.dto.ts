import { PartialType } from "@nestjs/swagger";
import { CreateJobSeekerSkillDto } from "./create-job-seeker-skill.dto";

export class UpdateJobSeekerSkillDto extends PartialType(
  CreateJobSeekerSkillDto,
) {}
