import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateJobSeekerPostingDto {
  @ApiProperty({ example: "Tashkent", description: "Name of the city" })
  @IsString()
  city: string;

  @ApiProperty({ example: 3000000, description: "Depended salary" })
  @IsNumber({}, { message: "Salary must be a number" })
  salary: number;

  @ApiProperty({ example: "2 month", description: "Time for apply" })
  @IsString({ message: "Time for apply must be a string" })
  timeForApply: string;

  @ApiProperty({
    example: "I am searching a job for FullStack developer",
    description: "Target job",
  })
  @IsString({ message: "Target must be a string" })
  target: string;

  @ApiProperty({ example: "456", description: "Job seeker ID (foreign key)" })
  @IsNotEmpty({ message: "Job seeker ID is required" })
  @IsNumber({}, { message: "Job seeker ID must be a number" })
  jobSeekerId: number;
}
