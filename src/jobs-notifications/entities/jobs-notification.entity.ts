import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobSeekerPosting } from "../../job-seeker-posting/entities/job-seeker-posting.entity";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";

@Entity({ name: "jobs_notifications" })
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
    description: "Notification is wiewed or not",
  })
  @Column({ default: false })
  isWiewed: boolean;

  @ManyToOne(() => JobSeekerPosting)
  @JoinColumn({ name: "jobPostingId", referencedColumnName: "id" })
  jobPosting: JobSeekerPosting;

  @ManyToOne(() => JobSeeker)
  @JoinColumn({ name: "jobSeekerId", referencedColumnName: "id" })
  jobSeeker: JobSeeker;
}
