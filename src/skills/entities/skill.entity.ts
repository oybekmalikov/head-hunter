import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SkillsCategory } from "../../skills-category/entities/skills_category.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "skills" })
export class Skill {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the skill',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'JavaScript',
    description: 'Name of the skill',
    maxLength: 55,
  })
  @Column({ length: 55 })
  name: string;

  @ApiProperty({
    example: 'A scripting language used to create and control dynamic website content',
    description: 'Detailed description of the skill',
    maxLength: 255,
  })
  @Column({ length: 255 })
  description: string;

  @ApiProperty({
    type: () => SkillsCategory,
    description: 'The category this skill belongs to',
  })
  @ManyToOne(() => SkillsCategory, (category) => category.skills)
  categoryId: SkillsCategory;
}
