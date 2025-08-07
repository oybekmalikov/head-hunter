import { IsNumber } from 'class-validator';

export class CreateJobSeekerSkillDto {
  @IsNumber()
  degree: number;

  @IsNumber()
  experience: number;

  @IsNumber()
  job_seeker_id: number;

  @IsNumber()
  skill_id: number;
}
