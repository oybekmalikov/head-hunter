import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobSeekerPosting } from "../../job-seeker-posting/entities/job-seeker-posting.entity";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";
import { Skill } from "../../skills/entities/skill.entity";

@Entity("job-seekers-skills")
export class JobSeekerSkill {
  @ApiProperty({
    example: 1,
    description: "Skills unique id",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "junior",
    description: "Degree of skill",
  })
  @Column()
  degree: string;

  @ApiProperty({
    example: 2,
    description: "Experience of skill in years",
  })
  @Column()
  experience: number;

  @ApiProperty({
    example: 1,
    description: "Job seeker's id",
  })
  @Column()
  jobSeekerId: number;

  @ApiProperty({
    example: 1,
    description: "Skill's id",
  })
  @Column()
  skillId: number;

  // Relations
  @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.skills)
  @JoinColumn({ name: "jobSeekerId" })
  jobSeeker: JobSeeker;

  @ManyToOne(() => Skill, (skill) => skill.jobSeekerSkills)
  @JoinColumn({ name: "skillId" })
  skill: Skill;

  @ManyToMany(() => JobSeekerPosting, (posting) => posting.jobSeekerSkills)
  jobSeekerPostings: JobSeekerPosting[];
}
