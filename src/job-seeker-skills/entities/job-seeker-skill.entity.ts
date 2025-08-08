import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('job_seeker_skills')
export class JobSeekerSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  degree: number; 

  @Column()
  experience: number;

  @Column()
  jobSeekerId: number;

  @Column()
  skillId: number;
}
