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
      order: { id: "ASC" },
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

  async findAllByPagination(page: number, limit: number) {
    const [data, total] = await this.skillRepo.findAndCount({
      relations: ["category"],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
    });

    if (!data || data.length === 0) {
      return { message: "No skills found.", success: false };
    }

    return {
      message: "List of all skills",
      data: { data, total, page, limit },
      success: true,
    };
  }
  async findOne(id: number) {
    const one = await this.skillRepo.findOne({
      where: { id },
      relations: ["category"],
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
    let del: any;
    try {
      del = await this.skillRepo.delete({ id });
    } catch (error) {
      return {
        message: `Cannot delete skill with ID ${id}. It has associated job postings.`,
        success: false,
      };
    }
    if (del.affected === 0) {
      return {
        message: `Skill with ID ${id} not found. Deletion failed.`,
        success: false,
      };
    }
    return {
      message: `Skill with ID ${id} was successfully deleted.`,
      data: { affected: del.affected },
      success: true,
    };
  }

  async findAllByName(name: string) {
    const skills = await this.skillRepo
      .createQueryBuilder("skill")
      .where("skill.name ILIKE :name", { name: `%${name}%` })
      .leftJoinAndSelect("skill.category", "category")
      .getMany();

    if (!skills.length) {
      return {
        success: false,
        message: "Skill not found",
      };
    }

    return {
      success: true,
      message: "Skills found",
      data: skills,
    };
  }

  async findAllByCategory(categoryId: number) {
    const skills = await this.skillRepo.find({
      where: { category: { id: categoryId } },
      relations: ["category"],
    });

    if (!skills || skills.length === 0) {
      return {
        success: false,
        message: `No skills found for category ID ${categoryId}.`,
      };
    }

    return {
      success: true,
      message: "Skills found by category",
      data: skills,
    };
  }
}
