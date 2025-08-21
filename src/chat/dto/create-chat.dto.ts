import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChatPrivateDto {
  @ApiProperty({
    example: "We would like to schedule an interview.",
    description: "Content of the message",
  })
  @IsString({ message: "Content must be a string" })
  message: string;

  @ApiProperty({
    example: 1,
    description: "ID of the user who sent the message",
  })
  @IsNumber({}, { message: "senderId must be a number" })
  senderId: number;

  @ApiProperty({
    example: 2,
    description: "ID of the user who received the message",
  })
  @IsNumber({}, { message: "recipientId must be a number" })
  recipientId: number;

  @ApiProperty({ example: 3, description: "ID of the related chat" })
  @IsNumber({}, { message: "chatId must be a number" })
  chatId: number;

  @IsOptional()
  @IsBoolean({ message: "isDeleted must be a boolean" })
  isDeleted: boolean;
}
