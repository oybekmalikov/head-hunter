import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobPosting } from "../../job-postings/entities/job-posting.entity";
import { ApiProperty } from "@nestjs/swagger"

@Entity({ name: "job-categories" })
export class JobCategory {
  @ApiProperty({
    example: 1,
    description: "The unique id of the job category",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Software Development",
    description: "The name of the job category",
  })
  @Column({ length: 55 })
  name: string;

  @ApiProperty({
    example: "This category includes all software development jobs.",
    description: "The description of the job category",
  })
  @Column({ length: 255 })
  description: string;

  @ApiProperty({
    example: true,
    description: "Whether the category is active",
  })
  @Column()
  isActive: boolean;

  // Relations
  @OneToMany(() => JobPosting, (jobPosting) => jobPosting.category)
  jobPostings: JobPosting[];
}
