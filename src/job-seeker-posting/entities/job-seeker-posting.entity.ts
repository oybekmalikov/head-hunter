import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "job_seeker_posting" })
export class JobSeekerPosting {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  city: string;

  @Column()
  salary: string;

  @Column()
  timeForApply: string;

  @Column()
  target: string;

  @Column()
  skillsId: string;

  @Column()
  jobSeekerId: string;
}
