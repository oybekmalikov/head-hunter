import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobCategory } from "src/job-category/entities/job_category.entity";
import { JobPosting } from "src/job-postings/entities/job-posting.entity";
import { CreateJobPostingDto } from "src/job-postings/dto/create-job-posting.dto";
import { UpdateJobPostingDto } from "src/job-postings/dto/update-job-posting.dto";
// import { Employer } from "src/employer/entities/employer.entity";
// import { Companies } from "src/companies/entities/companies.entity";

@Injectable()
export class JobPostingsService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobRepo: Repository<JobPosting>,
    @InjectRepository(JobCategory)
    private readonly categoryRepo: Repository<JobCategory>,
    // @InjectRepository(Employer)
    // private readonly employerRepo: Repository<Employer>,
    // @InjectRepository(Companies)
    // private readonly companyRepo: Repository<Companies>
  ) {}

  async create(createDto: CreateJobPostingDto) {
    const {
      title,
      description,
      requirements,
      required_skills,
      job_type,
      work_loc,
      location,
      salary_min,
      salary_max,
      required_experience,
      salary_period,
      experience_level,
      education_level,
      application_deadline,
      status,
      application_count,
      view_count,
      published_at,
      user_mark,
      categoryId,
      // employerId,
      // cmpId
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
      required_skills,
      job_type,
      work_loc,
      location,
      salary_min,
      salary_max,
      required_experience,
      salary_period,
      experience_level,
      education_level,
      application_deadline,
      status,
      application_count,
      view_count,
      published_at,
      user_mark,
      categoryId: category,
      // employerId: { id: employerId } as Employer,
      // cmpId: { id: cmpId } as Companies
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
      relations: ["categoryId"],
    });

    return {
      message: "All job postings list",
      data: all,
      success: true,
    };
  }

  async findOne(id: number) {
    const one = await this.jobRepo.findOne({
      where: { id },
      relations: ["categoryId"],
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
      const category = await this.categoryRepo.findOneBy({ id: updateDto.categoryId });
      if (!category) {
        return {
          message: `Category with ID ${updateDto.categoryId} not found.`,
          success: false,
        };
      }
      updatedFields.categoryId = category;
    }

    // if (updateDto.employerId) {
    //   updatedFields.employerId = { id: updateDto.employerId } as Employer;
    // }

    // if (updateDto.cmpId) {
    //   updatedFields.cmpId = { id: updateDto.cmpId } as Companies;
    // }

    await this.jobRepo.update(id, updatedFields);

    const updated = await this.jobRepo.findOne({
      where: { id },
      relations: ["categoryId"],
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
