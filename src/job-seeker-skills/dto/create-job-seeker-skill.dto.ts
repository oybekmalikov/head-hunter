import { IsNumber } from 'class-validator';

export class CreateJobSeekerSkillDto {
  @IsNumber()
  degree: number;

  @IsNumber()
  experience: number;

  @IsNumber()
  jobSeekerId: number;

  @IsNumber()
  skillId: number;
}
