import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobSeekerPosting } from "../../job-seeker-posting/entities/job-seeker-posting.entity";
import { JobSeekerSkill } from "../../job-seeker-skills/entities/job-seeker-skill.entity";
import { SkillsCategory } from "../../skills-category/entities/skills_category.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "skills" })
export class Skill {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the skill",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "JavaScript",
    description: "Name of the skill",
  })
  @Column({ length: 55 })
  name: string;

  @ApiProperty({
    example:
      "A high-level, dynamic, untyped, and interpreted programming language.",
    description: "Description of the skill",
  })
  @Column({ length: 255 })
  description: string;
  @ApiProperty({
    example: 1,
    description: "ID of the related skill category",
  })
  @Column()
  categoryId: number;

  // Relations
  @ManyToOne(() => SkillsCategory, (category) => category.skills)
  category: SkillsCategory;

  @OneToMany(() => JobSeekerSkill, (jobSeekerSkill) => jobSeekerSkill.skill)
  jobSeekerSkills: JobSeekerSkill[];
}
