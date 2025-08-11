import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateEduDto {
  @ApiProperty({ example: "TATU", description: "University name" })
  @IsString({ message: "universityName must be a string" })
  @IsNotEmpty({ message: "universityName is required" })
  universityName: string;

  @ApiProperty({ example: "Information safety", description: "Faculty name" })
  @IsString({ message: "faculty must be a string" })
  @IsNotEmpty({ message: "faculty is required" })
  faculty: string;

  @ApiProperty({ example: "Magistr", description: "Degree" })
  @IsString({message: "dagree must be a string"})
  dagree: string;

  @ApiProperty({ example: "2020-09-01", description: "Satrt date" })
  @IsDateString({}, { message: "startDate must be a valid date" })
  startDate: string;

  @ApiProperty({
    example: "2024-06-30",
    description: "End date",
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: "endDate must be a valid date" })
  endDate?: string;

  @ApiProperty({ example: false, description: "Job seeker still studying at university" })
  @IsBoolean({message: "isCurrent must be a boolean"})
  isCurrent: boolean;

  @ApiProperty({
    example: "Additional note",
    description: "Additional note",
    required: false,
  })
  @IsOptional()
  @IsString({message: "description must be a string"  })
  description?: string;

  @ApiProperty({ example: 5, description: "Job seeker ID " })
  @IsNumber({},{message: "jobSeekerId must be a number"})
  jobSeekerId: number;
}
