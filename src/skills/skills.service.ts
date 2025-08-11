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
    private readonly categoryRepo: Repository<SkillsCategory>,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const { name, description, categoryId } = createSkillDto;
    const category = await this.categoryRepo.findOneBy({
      id: categoryId,
    });
    if (!category) {
      return {
        message: `Skill category with ID ${categoryId} not found.`,
        data: [],
        success: false,
      };
    }
    const skill = this.skillRepo.create({
      name,
      description,
      category: category,
    });
    const savedSkill = await this.skillRepo.save(skill);

    return {
      message: "Skill successfully created",
      data: savedSkill,
      success: true,
    };
  }
  async findAll() {
    const all = await this.skillRepo.find({
      relations: ["category"],
    });

    if (!all || all.length === 0) {
      return { message: "No skills found.", success: false, data: [] };
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
      relations: ["category"],
    });

    if (!one) {
      return {
        message: `Skill with ID ${id} not found.`,
        data: [],
        success: false,
      };
    }

    return {
      message: "Skill details",
      data: one,
      success: true,
    };
  }
  async findAllByName(name: string) {
    const skills = await this.skillRepo.find({
      where: { name },
    });

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

  async findAllByCategoryId(categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return {
        success: false,
        message: `Skill category with ID ${categoryId} not found.`,
        data: [],
      };
    }

    const skills = await this.skillRepo.find({
      where: { category: { id: categoryId } },
      relations: ["category"],
    });

    if (!skills.length) {
      return {
        success: false,
        message: `No skills found for category ID ${categoryId}.`,
        data: [],
      };
    }

    return {
      success: true,
      message: `Skills found for category ID ${categoryId}.`,
      data: skills,
    };
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const { name, description, categoryId } = updateSkillDto;
    const updatedFields: any = {
      name,
      description,
    };
    if (categoryId) {
      updatedFields.category_id = { id: categoryId } as SkillsCategory;
    }

    const upd = await this.skillRepo.preload({ id, ...updatedFields });
    if (!upd) {
      return {
        message: "Failed to update skill",
        data: [],
        success: false,
      };
    }

    return {
      message: "Skill successfully updated",
      data: await this.skillRepo.save(upd),
      success: true,
    };
  }

  async remove(id: number) {
    const del = await this.skillRepo.delete({ id });

    if (del.affected === 0) {
      return {
        message: `Skill with ID ${id} not found. Deletion failed.`,
        data: [],
        success: false,
      };
    }

    return {
      message: `Skill with ID ${id} was successfully deleted.`,
      data: { affected: del.affected },
      success: true,
    };
  }
}
