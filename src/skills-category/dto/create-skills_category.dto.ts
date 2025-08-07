import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateSkillsCategoryDto {
  @ApiProperty({
    example: "IT & Software",
    description: "The name of the skill category",
  })
  @IsNotEmpty({ message: "Category name is required" })
  @IsString({ message: "Category name must be a string" })
  @Length(3, 55, {
    message: "Category name must be between 3 and 55 characters",
  })
  name: string;

  @ApiProperty({
    example: "Jobs related to IT industry including software, hardware, etc.",
    description: "Detailed description of the category",
  })
  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: "Description must be a string" })
  @Length(1, 255, {
    message: "Description must be between 1 and 255 characters",
  })
  description: string;
}
