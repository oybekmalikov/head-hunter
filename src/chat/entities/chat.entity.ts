import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobApplication } from "../../job-applications/entities/job-application.entity";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger"

@Entity("chats")
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Job Application Discussion",
    description: "Title of the chat",
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "Let's discuss the details of the job application.",
    description: "Content of the chat message",
  })
  @Column()
  content: string;

  @ApiProperty({
    example: false,
    description: "Indicates if the chat message has been read",
  })
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty({
    example: "2023-10-01T12:00:00Z",
    description: "Timestamp when the chat message was read",
  })
  @Column({ nullable: true })
  readAt: string;

  @ApiProperty({
    example: "2023-10-01T12:00:00Z",
    description: "Timestamp when the chat message was sent",
  })
  @Column({ type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
  sentAt: string;

  @ApiProperty({
    example: 1,
    description: "ID of the user who sent the chat message",
  })
  @Column()
  senderId: number;

  @ApiProperty({
    example: 2,
    description: "ID of the user who received the chat message",
  })
  @Column()
  recipientId: number;

  @ApiProperty({
    example: 3,
    description: "ID of the job application associated with the chat",
  })
  @Column()
  applicationId: number;

  // Relations
  @ManyToOne(() => User, (user) => user.sentChats)
  @JoinColumn({ name: "senderId" })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedChats)
  @JoinColumn({ name: "recipientId" })
  recipient: User;

  @ManyToOne(() => JobApplication, (jobApplication) => jobApplication.chats)
  @JoinColumn({ name: "applicationId" })
  jobApplication: JobApplication;
}
