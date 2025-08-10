import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesType } from "../../app.constants";
import { Chat } from "../../chat/entities/chat.entity";
import { Employer } from "../../employers/entities/employer.entity";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";

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
  role: RolesType;

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
  @Column({ default: true })
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

  @OneToMany(() => Chat, (chat) => chat.sender)
  sentChats: Chat[];

  @OneToMany(() => Chat, (chat) => chat.recipient)
  receivedChats: Chat[];
}
