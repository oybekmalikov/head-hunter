import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("job_seeker_posting")
export class JobSeekerPosting {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  city: string;

  @Column()
  salary: string;

  @Column()
  time_for_apply: string;

  @Column()
  target: string;

  @Column()
  skills_id: string;

  @Column()
  job_seeker_id: string;
}
