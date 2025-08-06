import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";

export class CreateJobCategoryDto {
  @ApiProperty({
    example: "IT & Software",
    description: "The name of the job category",
  })
  @IsNotEmpty({ message: "name is required" })
  @IsString({ message: "name must be a string" })
  @Length(3, 55, { message: "name must be between 3 and 55 characters long" })
  @IsNotEmpty({ message: "name is required" })
  name: string;

  @ApiProperty({
    example: "Jobs related to IT industry including software, hardware, etc.",
    description: "Detailed description of the category",
  })
  @IsNotEmpty({ message: "description is required" })
  @IsString({ message: "description must be a string" })
  @Length(1, 255, { message: "description must be at most 255 characters" })
  @IsNotEmpty({ message: "description is required" })
  description: string;

  @ApiProperty({
    example: true,
    description: "Whether the category is active",
  })
  @IsNotEmpty({ message: "is_active is required" })
  @IsBoolean({ message: "is_active must be a boolean" })
  is_active: boolean;
}
