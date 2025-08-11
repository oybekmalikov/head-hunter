import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "../../company/entities/company.entity";
import { Employer } from "../../employers/entities/employer.entity";
import { JobApplication } from "../../job-applications/entities/job-application.entity";
import { JobCategory } from "../../job-category/entities/job_category.entity";
import { JobsNotification } from "../../jobs-notifications/entities/jobs-notification.entity";
import { SavedJob } from "../../saved-jobs/entities/saved-job.entity";

@Entity({ name: "job-postings" })
export class JobPosting {
  @ApiProperty({
    example: 1,
    description: "The unique id of the job posting",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: "The employer who created this job posting",
  })
  @Column()
  employerId: number;

  @ApiProperty({
    example: 1,
    description: "The job category this posting belongs to",
  })
  @Column()
  categoryId: number;

  @ApiProperty({
    example: 1,
    description: "The company this job posting is for",
  })
  @Column()
  companyId: number;

  @ApiProperty({
    example: "Senior Software Engineer",
    description: "The job title",
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "We are looking for a senior software engineer...",
    description: "The job description",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: "React, Node.js, TypeScript",
    description: "The job requirements",
  })
  @Column()
  requirements: string;

  @ApiProperty({
    example: "JavaScript, React, Node.js",
    description: "Required skills for the job",
  })
  @Column()
  requiredSkills: string;

  @ApiProperty({
    example: "full-time",
    description: "The type of job (full-time, part-time, contract)",
  })
  @Column()
  jobType: string;

  @ApiProperty({
    example: "remote",
    description: "Work location type (remote, on-site, hybrid)",
  })
  @Column()
  workLocation: string;

  @ApiProperty({
    example: "Tashkent, Uzbekistan",
    description: "The job location",
  })
  @Column()
  location: string;

  @ApiProperty({
    example: 50000,
    description: "Minimum salary",
  })
  @Column()
  salaryMin: number;

  @ApiProperty({
    example: 80000,
    description: "Maximum salary",
  })
  @Column()
  salaryMax: number;

  @ApiProperty({
    example: 3,
    description: "Required years of experience",
  })
  @Column()
  requiredExperience: number;

  @ApiProperty({
    example: "monthly",
    description: "Salary period (monthly, yearly, hourly)",
  })
  @Column()
  salaryPeriod: string;

  @ApiProperty({
    example: "senior",
    description: "Experience level (junior, mid, senior)",
  })
  @Column()
  experienceLevel: string;

  @ApiProperty({
    example: "bachelor",
    description: "Required education level",
  })
  @Column()
  educationLevel: string;

  @ApiProperty({
    example: "2024-12-31",
    description: "Application deadline",
  })
  @Column()
  applicationDeadline: Date;

  @ApiProperty({
    example: "active",
    description: "Job posting status",
  })
  @Column()
  status: string;

  @ApiProperty({
    example: 15,
    description: "Number of applications received",
  })
  @Column({ default: 0 })
  applicationCount: number;

  @ApiProperty({
    example: 150,
    description: "Number of views",
  })
  @Column({ default: 0 })
  viewCount: number;

  @ApiProperty({
    example: "2024-01-15",
    description: "When the job was published",
  })
  @Column({default: () => "CURRENT_TIMESTAMP"})
  publishedAt: Date;

  @ApiProperty({
    example: 4.5,
    description: "User rating for this job posting",
  })
  @Column({ default: 0 })
  userMark: number;

  // Relations
  @ManyToOne(() => Employer, (employer) => employer.jobPostings)
  employer: Employer;

  @ManyToOne(() => JobCategory, (category) => category.jobPostings)
  category: JobCategory;

  @ManyToOne(() => Company, (company) => company.jobPostings)
  company: Company;

  @OneToMany(() => JobApplication, (application) => application.jobPosting)
  applications: JobApplication[];

  @OneToMany(() => SavedJob, (savedJob) => savedJob.jobPosting)
  savedJobs: SavedJob[];

  @OneToMany(() => JobsNotification, (notification) => notification.jobPosting)
  notifications: JobsNotification[];
}
