import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UploadResumeDto {
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Resume file (PDF, DOC, or DOCX)",
    example: "resume.pdf",
  })
  file: Express.Multer.File;

  @ApiProperty({
    type: "string",
    description: "Optional description for the resume",
    required: false,
    example: "Updated resume with latest experience",
  })
  @IsOptional()
  @IsString()
  description?: string;
}
