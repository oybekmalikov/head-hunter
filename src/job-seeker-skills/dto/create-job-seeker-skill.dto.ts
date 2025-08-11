import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateJobSeekerSkillDto {
  @ApiProperty({
    example: "junior",
    description: "Degree of skill",
  })
  @IsString({ message: "Degree must be a string" })
  degree: string;

  @ApiProperty({
    example: 1,
    description: "Experience of skill in years",
  })
  @IsNumber({}, { message: "Experience must be a number" })
  experience: number;

  @ApiProperty({
    example: 1,
    description: "Job seeker's id",
  })
  @IsNumber({}, { message: "Job Seeker ID must be a number" })
  jobSeekerId: number;

  @ApiProperty({
    example: 1,
    description: "Skill's id",
  })
  @IsNumber({}, { message: "Skill ID must be a number" })
  skillId: number;
}
