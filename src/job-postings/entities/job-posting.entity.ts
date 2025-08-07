import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { JobCategory } from "src/job-category/entities/job_category.entity";

@Entity("job_postings")
export class JobPosting {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "Unique identifier for the job posting" })
  id: number;

  @Column()
  @ApiProperty({ description: "Title of the job position" })
  title: string;

  @Column()
  @ApiProperty({ description: "Detailed description of the job" })
  description: string;

  @Column()
  @ApiProperty({ description: "Job requirements" })
  requirements: string;

  @Column()
  @ApiProperty({ description: "Skills required for the job" })
  required_skills: string;

  @Column()
  @ApiProperty({ description: "Type of job (e.g., full-time, part-time)" })
  job_type: string;

  @Column()
  @ApiProperty({ description: "Work location type (e.g., remote, onsite)" })
  work_loc: string;

  @Column()
  @ApiProperty({ description: "Location or city of the job" })
  location: string;

  @Column()
  @ApiProperty({ description: "Minimum salary for the position" })
  salary_min: number;

  @Column()
  @ApiProperty({ description: "Maximum salary for the position" })
  salary_max: number;

  @Column()
  @ApiProperty({ description: "Required years of experience" })
  required_experience: number;

  @Column()
  @ApiProperty({ description: "Salary payment period (e.g., monthly, yearly)" })
  salary_period: string;

  @Column()
  @ApiProperty({ description: "Experience level (e.g., junior, senior)" })
  experience_level: string;

  @Column()
  @ApiProperty({ description: "Required education level for the job" })
  education_level: string;

  @Column({ type: "timestamp" })
  @ApiProperty({
    description: "Deadline for job application",
    type: String,
    format: "date-time",
  })
  application_deadline: Date;

  @Column()
  @ApiProperty({ description: "Status of the job post (e.g., active, closed)" })
  status: string;

  @Column()
  @ApiProperty({ description: "Number of applications received" })
  application_count: number;

  @Column()
  @ApiProperty({ description: "Number of times the job was viewed" })
  view_count: number;

  @Column({ type: "timestamp" })
  @ApiProperty({
    description: "Date and time the job was published",
    type: String,
    format: "date-time",
  })
  published_at: Date;

  @Column()
  @ApiProperty({ description: "User rating or mark for the job post" })
  user_mark: number;

  @ManyToOne(() => JobCategory, (category) => category.jobcategory)
  categoryId: JobCategory;

  // @ManyToOne(() => Employer, (employer) => employer.joppost)
  // employerId: Employer;

  // @ManyToOne(() => Companies, (companies) => companies.joppost)
  // cmpId: Companies;
}
