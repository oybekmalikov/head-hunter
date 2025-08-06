import { Injectable } from "@nestjs/common";
import { CreateSkillsCategoryDto } from "./dto/create-skills_category.dto";
import { UpdateSkillsCategoryDto } from "./dto/update-skills_category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { SkillsCategory } from "./entities/skills_category.entity";
import { Repository } from "typeorm";

@Injectable()
export class SkillsCategoryService {
  constructor(
    @InjectRepository(SkillsCategory)
    private readonly skillcategoryRepo: Repository<SkillsCategory>
  ) {}

  async create(createSkillCategoryDto: CreateSkillsCategoryDto) {
    return this.skillcategoryRepo.save(createSkillCategoryDto);
  }

  async findAll() {
    const all = await this.skillcategoryRepo.find();
    if (!all || all.length === 0) {
      return { message: "No skills categories found." };
    }
    return all;
  }

  async findOne(id: number) {
    const one = await this.skillcategoryRepo.findOneBy({ id });
    if (!one) {
      return { message: `Skill category with ID ${id} not found.` };
    }
    return one;
  }

  async update(id: number, updateSkillCategoryDto: UpdateSkillsCategoryDto) {
    const upd = await this.skillcategoryRepo.update(id, updateSkillCategoryDto);
    if (!upd) {
      return { message: "Failed to update the skill category." };
    }
    return this.skillcategoryRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const del = await this.skillcategoryRepo.delete(id);
    if (del.affected === 0) {
      return {
        message: `Skill category with ID ${id} not found. Deletion failed.`,
      };
    }
    return {
      message: `Skill category with ID ${id} was successfully deleted.`,
    };
  }
}
