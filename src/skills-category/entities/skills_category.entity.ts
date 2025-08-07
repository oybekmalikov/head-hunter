import { Skill } from "../../skills/entities/skill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "skills_category" })
export class SkillsCategory {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the skill category (auto-generated)",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Frontend",
    description: "Name of the skill category",
  })
  @Column({ length: 55 })
  name: string;

  @ApiProperty({
    example: "This category includes frontend-related technologies.",
    description: "Brief description of the category",
  })
  @Column({ length: 255 })
  description: string;

  @ApiProperty({
    type: () => [Skill],
    description: "List of skills related to this category",
  })
  @OneToMany(() => Skill, (skill) => skill.categoryId)
  skills: Skill[];
}
