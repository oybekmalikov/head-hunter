import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { JobApplication } from "../../job-applications/entities/job-application.entity";
import { Recipient } from "../../recipient/entities/recipient.entity";

@Entity("chat")
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  is_read: boolean;

  @Column({ type: "timestamp", nullable: true })
  read_at: Date;

  @Column({ type: "timestamp" })
  sent_at: Date;

  @Column()
  sender_id: number;

  @Column()
  @ManyToOne(() => Recipient, (recipient) => recipient.chats)
  recipientId: number;

  @Column()
  @ManyToOne(() => JobApplication, (jobApplication) => jobApplication.chats)
  jobApplicationId: number;
}
