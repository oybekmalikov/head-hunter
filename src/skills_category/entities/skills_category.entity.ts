
import { Skill } from "../../skills/entities/skill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "skills_category" })
export class SkillsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 55 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @OneToMany(() => Skill, (skill) => skill.category_id, { eager: true })
  skills: Skill[];
}
