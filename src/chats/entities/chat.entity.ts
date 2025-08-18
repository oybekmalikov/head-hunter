import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobApplication } from "../../job-applications/entities/job-application.entity"
import { Chat } from "../../chat/entities/chat.entity"
import { User } from "../../users/entities/user.entity"

@Entity("all_chats")
export class AllChats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId1: number;

  @Column()
  userId2: number;

  @Column()
  jobApplicationId: number;

  @Column({ default: false })
	isArchived?: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.user1Chats, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId1" })
  user1: User;

  @ManyToOne(() => User, (user) => user.user2Chats, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId2" })
  user2: User;

  @ManyToOne(() => JobApplication, (jobApplication) => jobApplication.allChats, { onDelete: "CASCADE" })
  @JoinColumn({ name: "jobApplicationId" })
  jobApplication: JobApplication;

  @OneToMany(() => Chat, (chat) => chat.allChats, { onDelete: "CASCADE" })
  chats: Chat[];
}
