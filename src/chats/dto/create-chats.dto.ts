import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CreateChatDto {
  @ApiProperty({
    example: 1,
    description: "The ID of the user who sent the message",
  })
  @IsNumber()
  userId1: number;

  @ApiProperty({
    example: 1,
    description: "The ID of the user who received the message",
  })
  @IsNumber()
  userId2: number;

  @ApiProperty({
    example: 1,
    description: "The ID of the job application",
  })
  @IsNumber()
  jobApplicationId: number;

  @ApiProperty({
    example: true,
    description: "The status of the chat",
  })
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;


  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
