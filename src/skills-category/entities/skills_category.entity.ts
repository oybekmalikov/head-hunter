import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "../../skills/entities/skill.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "skills-categorys" })
export class SkillsCategory {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the skill category",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Programming Languages",
    description: "Name of the skill category",
  })
  @Column({ length: 55 })
  name: string;

  @ApiProperty({
    example:
      "Categories related to programming languages such as Python, Java, etc.",
    description: "Description of the skill category",
  })
  @Column({ length: 255 })
  description: string;

  // Relations
  @OneToMany(() => Skill, (skill) => skill.category)
  skills: Skill[];
}
