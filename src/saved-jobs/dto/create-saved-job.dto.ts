import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSavedJobDto {
  @ApiProperty({
    example: 1,
    description: "The unique id of the job posting",
  })
  @IsNumber({}, { message: "jobPostingId must be a number" })
  @IsNotEmpty({ message: "jobPostingId is required" })
  jobPostingId: number;

  @ApiProperty({
    example: 1,
    description: "The unique id of the job seeker",
  })
  @IsNumber({}, { message: "jobSeekerId must be a number" })
  @IsNotEmpty({ message: "jobSeekerId is required" })
  jobSeekerId: number;
}
