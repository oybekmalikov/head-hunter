import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class CreateChatDto {
  @ApiProperty({ example: 'Job Offer', description: 'Title of the chat message' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({ example: 'We would like to schedule an interview.', description: 'Content of the message' })
  @IsString({ message: 'Content must be a string' })
  content: string;

  @ApiProperty({ example: 1, description: 'ID of the sender' })
  @IsNumber({},{ message: 'senderId must be a number' })
  senderId: number;

  @ApiProperty({ example: 2, description: 'ID of the recipient' })
  @IsNumber({},{ message: 'recipientId must be a number' })
  recipientId: number;

  @ApiProperty({ example: 3, description: 'ID of the related job application' })
  @IsNumber({},{ message: 'applicationId must be a number' })
  applicationId: number;
}
