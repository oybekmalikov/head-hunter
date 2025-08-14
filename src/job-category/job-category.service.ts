import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateJobCategoryDto } from "./dto/create-job_category.dto";
import { UpdateJobCategoryDto } from "./dto/update-job_category.dto";
import { JobCategory } from "./entities/job_category.entity";

@Injectable()
export class JobCategoryService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly jobcategoryRepo: Repository<JobCategory>,
  ) {}

  async create(createJobCategoryDto: CreateJobCategoryDto) {
    const crt = await this.jobcategoryRepo.save(createJobCategoryDto);
    return {
      message: "Job category successfully created.",
      data: crt,
      success: true,
    };
  }

  async findAll() {
    const all = await this.jobcategoryRepo.find({ order: { id: "ASC" } });
    if (!all || all.length === 0) {
      return { message: "No job categories found.", success: false };
    }
    return {
      message: "List of all job categories.",
      data: all,
      success: true,
    };
  }

  async findAllByPagination(page: number, limit: number) {
    const [result, total] = await this.jobcategoryRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
    });

    if (!result || result.length === 0) {
      return { message: "No job categories found.", success: false };
    }

    return {
      message: "Job categories retrieved successfully.",
      data: { data: result, total, page, limit },
      success: true,
    };
  }

  async findOne(id: number) {
    const one = await this.jobcategoryRepo.findOneBy({ id });
    if (!one) {
      return {
        message: `Job category with ID ${id} not found.`,
        success: false,
      };
    }
    return {
      message: "Job category details.",
      data: one,
      success: true,
    };
  }

  async update(id: number, updateJobCategoryDto: UpdateJobCategoryDto) {
    const upd = await this.jobcategoryRepo.preload({
      id,
      ...updateJobCategoryDto,
    });
    if (!upd) {
      return { message: "Failed to update job category.", success: false };
    }
    return {
      message: "Job category successfully updated.",
      data: await this.jobcategoryRepo.save(upd),
      success: true,
    };
  }

  async remove(id: number) {
    const del = await this.jobcategoryRepo.delete({ id });
    if (del.affected === 0) {
      return {
        message: `Job category with ID ${id} not found. Deletion failed.`,
        success: false,
      };
    }
    return {
      message: `Job category with ID ${id} was successfully deleted.`,
      data: del.affected,
      success: true,
    };
  }

  async findAllByName(name: string) {
    const categories = await this.jobcategoryRepo
      .createQueryBuilder("job_category")
      .where("job_category.name LIKE :name", { name: `%${name}%` })
      .getMany();

    if (!categories.length) {
      return {
        message: "No job categories found with the given name",
        success: false,
      };
    }

    return {
      message: "Job categories retrieved successfully",
      data: categories,
      success: true,
    };
  }

  async findAllByIsActive(isActive: boolean) {
    const categories = await this.jobcategoryRepo.find({
      where: { isActive },
    });

    if (!categories.length) {
      return {
        message: `No ${isActive ? "active" : "inactive"} job categories found`,
        success: false,
      };
    }

    return {
      message: "Job categories retrieved successfully",
      data: categories,
      success: true,
    };
  }
}
