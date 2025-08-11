import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "../../company/entities/company.entity";
import { JobPosting } from "../../job-postings/entities/job-posting.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: "employers" })
export class Employer {
  @ApiProperty({
    example: 1,
    description: "This is the user ID number.",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: "This is the user's id number",
  })
  @Column()
  userId: number;

  @ApiProperty({
    example: 1,
    description: "This is the company's id number",
  })
  @Column()
  companyId: number;

  @ApiProperty({
    example: "product manager",
    description: "This is the employer's position",
  })
  @Column()
  position: string;

  @ApiProperty({
    example: "IT department",
    description: "This is the employer's department",
  })
  @Column()
  department: string;

  // Relations
  @ManyToOne(() => User, (user) => user.employers)
  user: User;

  @ManyToOne(() => Company, (company) => company.employers)
  company: Company;

  @OneToMany(() => JobPosting, (jobPosting) => jobPosting.employer)
  jobPostings: JobPosting[];
}
