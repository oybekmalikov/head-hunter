import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobCategory } from "src/job-category/entities/job_category.entity";
import { CreateJobPostingDto } from "src/job-postings/dto/create-job-posting.dto";
import { UpdateJobPostingDto } from "src/job-postings/dto/update-job-posting.dto";
import { JobPosting } from "src/job-postings/entities/job-posting.entity";
import { Repository } from "typeorm";
import { Company } from "../company/entities/company.entity";
import { Employer } from "../employers/entities/employer.entity";

@Injectable()
export class JobPostingsService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobRepo: Repository<JobPosting>,
    @InjectRepository(JobCategory)
    private readonly categoryRepo: Repository<JobCategory>,
    @InjectRepository(Employer)
    private readonly employerRepo: Repository<Employer>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(createDto: CreateJobPostingDto) {
    const {
      title,
      description,
      requirements,
      requiredSkills,
      jobType,
      workLocation,
      location,
      salaryMin,
      salaryMax,
      requiredExperience,
      salaryPeriod,
      experienceLevel,
      educationLevel,
      applicationDeadline,
      status,
      categoryId,
      employerId,
      companyId,
    } = createDto;

    const category = await this.categoryRepo.findOneBy({ id: categoryId });
    if (!category) {
      return {
        message: `Job category with ID ${categoryId} not found.`,
        success: false,
      };
    }

    const newJob = this.jobRepo.create({
      title,
      description,
      requirements,
      requiredSkills,
      jobType,
      workLocation,
      location,
      salaryMin,
      salaryMax,
      requiredExperience,
      salaryPeriod,
      experienceLevel,
      educationLevel,
      applicationDeadline,
      status,
      category: category,
      employerId: employerId,
      companyId: companyId,
    });

    const saved = await this.jobRepo.save(newJob);

    return {
      message: "Job posting successfully created",
      data: saved,
      success: true,
    };
  }

  async findAll() {
    const all = await this.jobRepo.find({
      relations: ["category", "employer", "company"],
    });
    if (all.length === 0) {
      return {
        message: "No job postings found.",
        success: false,
      };
    }
    return {
      message: "All job postings list",
      data: all,
      success: true,
    };
  }

  async findOne(id: number) {
    const one = await this.jobRepo.findOne({
      where: { id },
      relations: ["category", "employer", "company"],
    });

    if (!one) {
      return {
        message: `Job posting with ID ${id} not found.`,
        success: false,
      };
    }

    return {
      message: "Job posting details",
      data: one,
      success: true,
    };
  }

  async update(id: number, updateDto: UpdateJobPostingDto) {
    const updatedFields: any = { ...updateDto };

    if (updateDto.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: updateDto.categoryId,
      });
      if (!category) {
        return {
          message: `Category with ID ${updateDto.categoryId} not found.`,
          success: false,
        };
      }
      updatedFields.categoryId = category;
    }

    if (updateDto.employerId) {
      updatedFields.employerId = { id: updateDto.employerId } as Employer;
    }

    if (updateDto.companyId) {
      updatedFields.coma = { id: updateDto.companyId } as Company;
    }

    await this.jobRepo.update(id, updatedFields);

    const updated = await this.jobRepo.findOne({
      where: { id },
      relations: ["category", "employer", "company"],
    });

    return {
      message: "Job posting successfully updated",
      data: updated,
      success: true,
    };
  }

  async remove(id: number) {
    const del = await this.jobRepo.delete(id);

    if (del.affected === 0) {
      return {
        message: `Job posting with ID ${id} not found.`,
        success: false,
      };
    }

    return {
      message: `Job posting with ID ${id} was successfully deleted.`,
      success: true,
    };
  }
}
