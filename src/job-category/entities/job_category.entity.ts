import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { JobPosting } from "src/job-postings/entities/job-posting.entity";

@Entity({ name: "job_category" })
export class JobCategory {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the job category",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "IT & Software",
    description: "Name of the job category",
    maxLength: 55,
  })
  @Column({ length: 55 })
  name: string;

  @ApiProperty({
    example: "All types of IT and software-related jobs",
    description: "A brief description of the job category",
    maxLength: 255,
  })
  @Column({ length: 255 })
  description: string;

  @ApiProperty({
    example: true,
    description: "Indicates whether the job category is currently active",
  })
  @Column()
  is_active: boolean;

  @OneToMany(() => JobPosting, (category) => category.categoryId)
  jobcategory: JobPosting[];
}
