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

@Entity({ name: "saved-jobs" })
export class SavedJob {
  @ApiProperty({ example: 1, description: "The unique id of the saved job" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: "The unique id of the job posting" })
  @Column()
  jobPostingId: number;

  @ApiProperty({ example: 1, description: "The unique id of the job seeker" })
  @Column()
  jobSeekerId: number;

  // Relations
  @ManyToOne((type) => JobPosting, (jobPosting) => jobPosting.savedJobs)
  @JoinColumn({ name: "jobPostingId", referencedColumnName: "id" })
  jobPosting: JobPosting;

  @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.savedJobs)
  @JoinColumn({ name: "jobSeekerId", referencedColumnName: "id" })
  jobSeeker: JobSeeker;
}
