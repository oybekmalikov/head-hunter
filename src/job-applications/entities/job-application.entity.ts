import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AllChats } from "../../chats/entities/chat.entity";
import { JobPosting } from "../../job-postings/entities/job-posting.entity";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";

@Entity({ name: "job-applications" })
export class JobApplication {
  @ApiProperty({
    example: 1,
    description: "The unique id of the job application",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: "The unique id of the job posting",
  })
  @Column()
  jobPostingId: number;

  @ApiProperty({
    example: 1,
    description: "The unique id of the job seeker",
  })
  @Column()
  jobSeekerId: number;

  @ApiProperty({
    example: "/",
    description: "The resume url of the job seeker",
  })
  @Column({ length: 255, nullable: true })
  resumeUrl: string;

  @ApiProperty({
    example: "Cover Letter",
    description: "The cover letter url of the job seeker",
  })
  @Column({ length: 255, nullable: true })
  coverLetter: string;

  @ApiProperty({
    example: "pending",
    description:
      "The status of the job application || pending, accepted, rejected",
  })
  @Column({
    enum: ["pending", "accepted", "rejected", "interview"],
    default: "pending",
  })
  status: string;

  // Relations
  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.applications)
  @JoinColumn({ name: "jobPostingId", referencedColumnName: "id" })
  jobPosting: JobPosting;

  @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.applications)
  @JoinColumn({ name: "jobSeekerId", referencedColumnName: "id" })
  jobSeeker: JobSeeker;

  @OneToMany(() => AllChats, (allChats) => allChats.jobApplication, {
    onDelete: "SET NULL",
  })
  allChats: AllChats[];
}
