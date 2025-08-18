import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AllChats } from "../../chats/entities/chat.entity";
import { Employer } from "../../employers/entities/employer.entity";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";
import { Notification } from "../../notifications/entities/notification.entity"

@Entity({ name: "users" })
export class User {
  @ApiProperty({
    example: 1,
    description: "This is the user ID number.",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Ali",
    description: "This is the user's first name",
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: "Aliyev",
    description: "This is the user's last name",
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "This user's email address",
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: "example1234",
    description: "This user's password",
  })
  @Column()
  password: string;

  @ApiProperty({
    example: "+998991234567",
    description: "This user's phone number",
  })
  @Column({ unique: true })
  phone?: string;

  @ApiProperty({
    example: "user",
    description: "This user's role",
  })
  @Column({ default: "user" })
  role: string;

  @ApiProperty({
    example: "/src/something/avatar.jpg",
    description: "This user's avatar path.",
  })
  @Column({ default: "" })
  avatarUrl?: string;

  @ApiProperty({
    example: true,
    description: "This user's activity",
  })
  @Column({ default: false })
  isActive: boolean;

  @ApiProperty({
    example: "qwertyu.12345.!@#$%^&*",
    description: "This is the user's token.",
  })
  @Column({ default: "" })
  refreshToken: string;

  // Relations
  @ApiProperty({
    type: () => [Employer],
    description: "This is the user's employers.",
  })
  @OneToMany(() => Employer, (employer) => employer.user)
  employers: Employer[];

  @OneToMany(() => JobSeeker, (jobSeeker) => jobSeeker.user)
  jobSeekers: JobSeeker[];

  @OneToMany(() => AllChats, (allChats) => allChats.user1, { onDelete: "SET NULL" })
  user1Chats: AllChats[];

  @OneToMany(() => AllChats, (allChats) => allChats.user2, { onDelete: "SET NULL" })
  user2Chats: AllChats[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
