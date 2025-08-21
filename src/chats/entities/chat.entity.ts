import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobApplication } from '../../job-applications/entities/job-application.entity';
import { Chat } from '../../chat/entities/chat.entity';
import { User } from '../../users/entities/user.entity';

@Entity('all_chats')
export class AllChats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId1: number;

  @Column()
  @Index()
  userId2: number;

  @Column()
  @Index()
  jobApplicationId: number;

  @Column({ default: false })
  isArchived: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.user1Chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId1' })
  user1: User;

  @ManyToOne(() => User, (user) => user.user2Chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId2' })
  user2: User;

  @ManyToOne(() => JobApplication, (jobApplication) => jobApplication.allChats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobApplicationId' })
  jobApplication: JobApplication;

  @OneToMany(() => Chat, (chat) => chat.allChats, { onDelete: 'CASCADE' })
  chats: Chat[];
}