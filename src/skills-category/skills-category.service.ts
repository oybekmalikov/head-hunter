import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSkillsCategoryDto } from "./dto/create-skills_category.dto";
import { UpdateSkillsCategoryDto } from "./dto/update-skills_category.dto";
import { SkillsCategory } from "./entities/skills_category.entity";

@Injectable()
export class SkillsCategoryService {
  constructor(
    @InjectRepository(SkillsCategory)
    private readonly skillcategoryRepo: Repository<SkillsCategory>,
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
    const all = await this.skillcategoryRepo.find({ order: { id: "ASC" } });
    if (!all || all.length === 0) {
      return { message: "No skills categories found.", success: false };
    }
    return {
      message: "List of all skill categories",
      data: all,
      success: true,
    };
  }

  async findAllWithPagination(page: number, limit: number) {
    const [result, total] = await this.skillcategoryRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
    });
    if (!result || result.length === 0) {
      return { message: "No skills categories found.", success: false };
    }
    return {
      message: "List of all skill categories",
      data: { data: result, total, page, limit },
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

  async findAllByName(name: string) {
    const skills = await this.skillcategoryRepo
      .createQueryBuilder("skills_category")
      .where("skills_category.name LIKE :name", { name: `%${name}%` })
      .getMany();

    if (!skills.length) {
      return {
        success: false,
        message: "Skill not found",
        data: [],
      };
    }

    return {
      success: true,
      message: "Skills found",
      data: skills,
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
