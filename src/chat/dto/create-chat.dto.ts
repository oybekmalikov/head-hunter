import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 'Job Offer', description: 'Title of the chat message' })
  title: string;

  @ApiProperty({ example: 'We would like to schedule an interview.', description: 'Content of the message' })
  content: string;

  @ApiProperty({ example: false, required: false, description: 'Whether the message has been read' })
  is_read?: boolean;

  @ApiProperty({ example: '2025-08-07T10:00:00Z', required: false, description: 'Timestamp when the message was read' })
  read_at?: Date;

  @ApiProperty({ example: '2025-08-07T09:55:00Z', description: 'Timestamp when the message was sent' })
  sent_at: Date;

  @ApiProperty({ example: 1, description: 'ID of the sender' })
  sender_id: number;

  @ApiProperty({ example: 2, description: 'ID of the recipient' })
  recipient_id: number;

  @ApiProperty({ example: 3, description: 'ID of the related job application' })
  application_id: number;
}
