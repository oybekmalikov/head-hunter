import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SkillsCategory } from "../../skills-category/entities/skills_category.entity";

@Entity({ name: "skills" })
export class Skill {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 55 })
	name: string;

	@Column({ length: 255 })
	description: string;

	@ManyToOne(() => SkillsCategory, (category_id) => category_id.skills)
	category_id: SkillsCategory;
}
