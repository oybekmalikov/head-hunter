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
    const crt = await this.skillcategoryRepo.save(createSkillCategoryDto);
    return {
      message: "Skill category successfully created",
      data: crt,
      success: true,
    };
  }

  async findAll() {
    const all = await this.skillcategoryRepo.find();
    if (!all || all.length === 0) {
      return { message: "No skills categories found.", success: false };
    }
    return {
      message: "List of all skill categories",
      data: all,
      success: true,
    };
  }

  async findOne(id: number) {
    const one = await this.skillcategoryRepo.findOneBy({ id });
    if (!one) {
      return {
        message: `Skill category with ID ${id} not found.`,
        success: false,
      };
    }
    return {
      message: "Skill category details",
      date: one,
      success: true,
    };
  }

  async update(id: number, updateSkillCategoryDto: UpdateSkillsCategoryDto) {
    const upd = await this.skillcategoryRepo.update(id, updateSkillCategoryDto);
    if (!upd) {
      return {
        message: "Failed to update the skill category.",
        success: false,
      };
    }
    return {
      message: "Skill category successfully updated",
      date: await this.skillcategoryRepo.findOne({ where: { id } }),
      success: true,
    };
  }

  async remove(id: number) {
    const del = await this.skillcategoryRepo.delete(id);
    if (del.affected === 0) {
      return {
        message: `Skill category with ID ${id} not found. Deletion failed.`,
        success: false,
      };
    }
    return {
      message: `Skill category with ID ${id} was successfully deleted.`,
      data: del.affected,
      success: true,
    };
  }
}
