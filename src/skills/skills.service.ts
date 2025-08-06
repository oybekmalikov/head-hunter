import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Skill } from "./entities/skill.entity";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { SkillsCategory } from "src/skills_category/entities/skills_category.entity";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const { name, description, category_id } = createSkillDto;

    const skill = this.skillRepo.create({
      name,
      description,
      category_id: { id: category_id, name } as SkillsCategory,
    });

    return this.skillRepo.save(skill);
  }

  async findAll() {
    const all = await this.skillRepo.find({
      relations: ["category_id"],
    });

    if (!all || all.length === 0) {
      return { message: "No skills found." };
    }

    return all;
  }

  async findOne(id: number) {
    const one = await this.skillRepo.findOne({
      where: { id },
      relations: ["category_id"],
    });

    if (!one) {
      return { message: `Skill with ID ${id} not found.` };
    }

    return one;
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

    await this.skillRepo.update(id, updatedFields);

    return this.skillRepo.findOne({
      where: { id },
      relations: ["category_id"],
    });
  }

  async remove(id: number) {
    const del = await this.skillRepo.delete(id);

    if (del.affected === 0) {
      return {
        message: `Skill with ID ${id} not found. Deletion failed.`,
      };
    }

    return {
      message: `Skill with ID ${id} was successfully deleted.`,
    };
  }
}
