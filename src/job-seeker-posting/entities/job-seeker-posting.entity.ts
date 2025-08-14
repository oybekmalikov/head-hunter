import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobSeekerSkill } from "../../job-seeker-skills/entities/job-seeker-skill.entity";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";

@Entity("job-seekers-postings")
export class JobSeekerPosting {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the job seeker posting",
  })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({
    example: "Tashkent",
    description: "City of job seeker",
  })
  @Column()
  city: string;

  @ApiProperty({
    example: 3000000,
    description: "Salary of job seeker",
  })
  @Column()
  salary: number;

  @ApiProperty({
    example: "2 month",
    description: "Time for apply of job seeker",
  })
  @Column()
  timeForApply: string;

  @Column()
  target: string;

  @Column()
  jobSeekerId: number;

  // Relations
  @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.postings)
  @JoinColumn({ name: "jobSeekerId" })
  jobSeeker: JobSeeker;

  @ManyToMany(() => JobSeekerSkill, (skill) => skill.jobSeekerPostings)
  @JoinTable()
  jobSeekerSkills: JobSeekerSkill[];
}
