import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobApplication } from "../../job-applications/entities/job-application.entity";
import { User } from "../../users/entities/user.entity";

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
  @ManyToOne(() => User)
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @Column()
  recipient_id: number;
  @ManyToOne(() => User)
  @JoinColumn({ name: "recipient_id" })
  recipient: User;

  @Column()
  application_id: number;
  @ManyToOne(() => JobApplication, (jobApplication) => jobApplication.chats)
  @JoinColumn({ name: "application_id" })
  jobApplication: JobApplication;
}
