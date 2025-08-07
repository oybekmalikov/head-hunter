import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SkillsCategory } from "src/skills-category/entities/skills_category.entity";
import { Repository } from "typeorm";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { Skill } from "./entities/skill.entity";

@Injectable()
export class SkillsService {
	constructor(
		@InjectRepository(Skill)
		private readonly skillRepo: Repository<Skill>,
		@InjectRepository(SkillsCategory)
		private readonly categoryRepo: Repository<SkillsCategory>
	) {}

	async create(createSkillDto: CreateSkillDto) {
		const { name, description, category_id } = createSkillDto;
		const category = await this.categoryRepo.findOneBy({
			id: category_id,
		});
		if (!category) {
			return {
				message: `Skill category with ID ${category_id} not found.`,
				success: false,
			};
		}
		const skill = this.skillRepo.create({
			name,
			description,
			category_id: { id: category_id } as SkillsCategory,
		});
		const savedSkill = await this.skillRepo.save(skill);

		return {
			message: "Skill successfully created",
			data: {
				...savedSkill,
				category_id: category,
			},
			success: true,
		};
	}
	async findAll() {
		const all = await this.skillRepo.find({
			relations: ["category_id"],
		});

		if (!all || all.length === 0) {
			return { message: "No skills found.", success: false };
		}

		return {
			message: "List of all skills",
			data: all,
			success: true,
		};
	}

	async findOne(id: number) {
		const one = await this.skillRepo.findOne({
			where: { id },
			relations: ["category_id"],
		});

		if (!one) {
			return { message: `Skill with ID ${id} not found.`, success: false };
		}

		return {
			message: "Skill details",
			data: one,
			success: true,
		};
	}

	async update(id: number, updateSkillDto: UpdateSkillDto) {
		const { name, description, category_id } = updateSkillDto;

		const updatedFields: any = {
			name,
			description,
		};

		if (category_id) {
			updatedFields.category_id = { id: category_id } as SkillsCategory;
		}

		const upd = await this.skillRepo.update(id, updatedFields);
		if (!upd) {
			return {
				message: "Failed to update skill",
				success: false,
			};
		}

		return {
			message: "Skill successfully updated",
			data: await this.skillRepo.findOne({
				where: { id },
				relations: ["category_id"],
			}),
			success: true,
		};
	}

	async remove(id: number) {
		const del = await this.skillRepo.delete(id);

		if (del.affected === 0) {
			return {
				message: `Skill with ID ${id} not found. Deletion failed.`,
				success: false,
			};
		}

		return {
			message: `Skill with ID ${id} was successfully deleted.`,
			affected: del.affected,
			success: true,
		};
	}
}
