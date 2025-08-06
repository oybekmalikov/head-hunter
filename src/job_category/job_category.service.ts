import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobCategoryDto } from "./dto/create-job_category.dto";
import { UpdateJobCategoryDto } from "./dto/update-job_category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { JobCategory } from "./entities/job_category.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobCategoryService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly jobcategoryRepo: Repository<JobCategory>
  ) {}

  async create(createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobcategoryRepo.save(createJobCategoryDto);
  }

  async findAll() {
    const all = await this.jobcategoryRepo.find();
    if (!all || all.length === 0) {
      return { message: "No job categories found." };
    }
    return all;
  }

  async findOne(id: number) {
    const one = await this.jobcategoryRepo.findOneBy({ id });
    if (!one) {
      return { message: `Job category with ID ${id} not found.` };
    }
    return one;
  }

  async update(id: number, updateJobCategoryDto: UpdateJobCategoryDto) {
    const upd = await this.jobcategoryRepo.update(id, updateJobCategoryDto);
    if (!upd) {
      return { message: "Failed to update the job category." };
    }
    return this.jobcategoryRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const del = await this.jobcategoryRepo.delete(id);
    if (del.affected === 0) {
      return {
        message: `Job category with ID ${id} not found. Deletion failed.`,
      };
    }
    return { message: `Job category with ID ${id} was successfully deleted.` };
  }
}
