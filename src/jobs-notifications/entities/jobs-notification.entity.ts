import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobPosting } from "../../job-postings/entities/job-posting.entity";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";

@Entity({ name: "jobs-notifications" })
export class JobsNotification {
  @ApiProperty({
    example: 1,
    description: "The unique id of the job notification",
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
    example: "Job title",
    description: "The job title",
  })
  @Column({ length: 100 })
  title: string;

  @ApiProperty({
    example: "Job description",
    description: "The job description",
  })
  @Column({ length: 255 })
  content: string;

  @ApiProperty({
    example: false,
    description: "Notification is viewed or not",
  })
  @Column({ default: false })
  isWiewed: boolean;

  // Relations
  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.notifications)
  @JoinColumn({ name: "jobPostingId", referencedColumnName: "id" })
  jobPosting: JobPosting;

  @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.notifications)
  @JoinColumn({ name: "jobSeekerId", referencedColumnName: "id" })
  jobSeeker: JobSeeker;
}
