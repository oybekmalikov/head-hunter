import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobCategory } from "src/job-category/entities/job_category.entity";
import { CreateJobPostingDto } from "src/job-postings/dto/create-job-posting.dto";
import { UpdateJobPostingDto } from "src/job-postings/dto/update-job-posting.dto";
import { JobPosting } from "src/job-postings/entities/job-posting.entity";
import { Repository } from "typeorm";
import { Company } from "../company/entities/company.entity";
import { Employer } from "../employers/entities/employer.entity";
import { JobSeekerSkill } from "../job-seeker-skills/entities/job-seeker-skill.entity";
import { JobSeeker } from "../job-seekers/entities/job-seeker.entity";
import { JobsNotification } from "../jobs-notifications/entities/jobs-notification.entity";

@Injectable()
export class JobPostingsService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobRepo: Repository<JobPosting>,
    @InjectRepository(JobCategory)
    private readonly categoryRepo: Repository<JobCategory>,
    @InjectRepository(JobsNotification)
    private readonly jobNotiRepo: Repository<JobsNotification>,
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepo: Repository<JobSeeker>,
    @InjectRepository(JobSeekerSkill)
    private readonly jobSeekerSkillRepo: Repository<JobSeekerSkill>,
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
    await this.checkSuitableJobSeekerAndSendNotification(
      saved.id,
      saved.title,
      saved.description,
    );
    return {
      message: "Job posting successfully created",
      data: saved,
      success: true,
    };
  }

  async checkSuitableJobSeekerAndSendNotification(
    jobId: number,
    title: string,
    desc: string,
  ) {
    const job = await this.jobRepo.findOne({ where: { id: +jobId } });
    const thisJobSkills = job!.requiredSkills.split(", ");
    if (!job) return [];
    const jobSeekerIds: any = [];
    const jobSeekers = await this.jobSeekerRepo.find({
      relations: ["user", "skills"],
    });
    for (const jobSeeker of jobSeekers) {
      let suitableCount = 0;
      const jobSeekerSkills = await this.jobSeekerSkillRepo.find({
        where: { jobSeekerId: jobSeeker.id },
        relations: ["skill"],
      });
      jobSeekerSkills.forEach((skill) => {
        if (thisJobSkills.includes(skill.skill.name)) {
          suitableCount++;
        }
      });
      if (suitableCount / thisJobSkills.length > 0.5) {
        jobSeekerIds.push({
          id: jobSeeker.id,
          precentage:
            Number((suitableCount / thisJobSkills.length).toFixed(2)) * 100,
        });
      }
    }
    jobSeekerIds.forEach(
      async (jobSeeker: { id: number; precentage: number }) => {
        const noti = this.jobNotiRepo.create({
          jobPostingId: jobId,
          jobSeekerId: jobSeeker.id,
          title: `A new job for you!`,
          content: `This job is ${jobSeeker.precentage}% a match for your skills.\n\nTitle: ${title}\n\nDescription: ${desc}`,
          isWiewed: false,
        });
        await this.jobNotiRepo.save(noti);
      },
    );
    return jobSeekerIds;
  }
  async findAll() {
    const all = await this.jobRepo.find({
      relations: ["category", "employer", "company"],
      order: { publishedAt: "DESC", id: "ASC" },
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

  async findAllByPagination(page: number, limit: number) {
    const [result, total] = await this.jobRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ["category", "employer", "company"],
      order: { publishedAt: "DESC", id: "ASC" },
    });

    if (!result || result.length === 0) {
      return { message: "No job postings found.", success: false };
    }

    return {
      message: "Job postings retrieved successfully.",
      data: { data: result, total, page, limit },
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

  async findByEmployerId(employerId: number) {
    const jobs = await this.jobRepo.find({ where: { employerId } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs found for employerId ${employerId}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByCategoryId(categoryId: number) {
    const jobs = await this.jobRepo.find({ where: { categoryId } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs found for categoryId ${categoryId}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByCompanyId(companyId: number) {
    const jobs = await this.jobRepo.find({ where: { companyId } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs found for companyId ${companyId}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByRequirements(requirements: string) {
    const jobs = await this.jobRepo.find({
      where: { requirements },
    });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs match requirements: ${requirements}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByRequiredSkills(requiredSkills: string) {
    const jobs = await this.jobRepo.find({
      where: { requiredSkills },
    });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs match skills: ${requiredSkills}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByJobType(jobType: string) {
    const jobs = await this.jobRepo.find({ where: { jobType } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with jobType: ${jobType}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByWorkLocation(workLocation: string) {
    const jobs = await this.jobRepo.find({ where: { workLocation } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with workLocation: ${workLocation}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByLocation(location: string) {
    const jobs = await this.jobRepo.find({
      where: { location },
    });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs in location: ${location}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findBySalaryMin(salaryMin: number) {
    const jobs = await this.jobRepo.find({ where: { salaryMin } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with salaryMin: ${salaryMin}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findBySalaryMax(salaryMax: number) {
    const jobs = await this.jobRepo.find({ where: { salaryMax } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with salaryMax: ${salaryMax}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findBySalaryPeriod(salaryPeriod: string) {
    const jobs = await this.jobRepo.find({ where: { salaryPeriod } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with salaryPeriod: ${salaryPeriod}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByExperienceLevel(experienceLevel: string) {
    const jobs = await this.jobRepo.find({ where: { experienceLevel } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with experienceLevel: ${experienceLevel}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByEducationLevel(educationLevel: string) {
    const jobs = await this.jobRepo.find({ where: { educationLevel } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with educationLevel: ${educationLevel}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByStatus(status: string) {
    const jobs = await this.jobRepo.find({ where: { status } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with status: ${status}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByPublishedAt(publishedAt: Date) {
    const jobs = await this.jobRepo.find({ where: { publishedAt } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs published at: ${publishedAt}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async findByUserMark(userMark: number) {
    const jobs = await this.jobRepo.find({ where: { userMark } });
    if (!jobs.length) {
      return {
        success: false,
        message: `No jobs with userMark: ${userMark}`,
      };
    }
    return { success: true, message: "Jobs found", data: jobs };
  }

  async searchJobPostings(filters: {
    search?: string;
    categoryId?: number;
    jobType?: number;
    location?: string;
    salaryMin?: number;
    salaryMax?: number;
    experienceLevel?: number;
    educationLevel?: number;
    status?: string;
    publishedAtFrom?: string;
    publishedAtTo?: string;
    applicationDeadlineAfter?: string;
    page?: number;
    limit?: number;
  }) {
    const query = this.jobRepo.createQueryBuilder("job");
    if (filters.search) {
      query.where(
        "job.title ILIKE :search OR job.description ILIKE :search OR job.requirements ILIKE :search OR job.required_skills ILIKE :search",
        { search: `%${filters.search}%` },
      );
    }
    if (filters.categoryId)
      query.andWhere("job.categoryId = :categoryId", {
        categoryId: filters.categoryId,
      });
    if (filters.jobType)
      query.andWhere("job.jobType = :jobType", { jobType: filters.jobType });
    if (filters.location)
      query.andWhere("job.location ILIKE :location", {
        location: `%${filters.location}%`,
      });
    if (filters.salaryMin)
      query.andWhere("job.salaryMin >= :salaryMin", {
        salaryMin: filters.salaryMin,
      });
    if (filters.salaryMax)
      query.andWhere("job.salaryMax <= :salaryMax", {
        salaryMax: filters.salaryMax,
      });
    if (filters.experienceLevel)
      query.andWhere("job.experienceLevel = :experienceLevel", {
        experienceLevel: filters.experienceLevel,
      });
    if (filters.educationLevel)
      query.andWhere("job.educationLevel = :educationLevel", {
        educationLevel: filters.educationLevel,
      });
    if (filters.status)
      query.andWhere("job.status = :status", { status: filters.status });
    if (filters.publishedAtFrom)
      query.andWhere("job.publishedAt >= :publishedAtFrom", {
        publishedAtFrom: filters.publishedAtFrom,
      });
    if (filters.publishedAtTo)
      query.andWhere("job.publishedAt <= :publishedAtTo", {
        publishedAtTo: filters.publishedAtTo,
      });
    if (filters.applicationDeadlineAfter)
      query.andWhere("job.applicationDeadline >= :applicationDeadlineAfter", {
        applicationDeadlineAfter: filters.applicationDeadlineAfter,
      });
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    query.skip((page - 1) * limit).take(limit);
    const [results, total] = await query.getManyAndCount();
    return {
      message: "Job postings found",
      data: { results, total, page, limit },
      success: true,
    };
  }

  async applyForJob(id: number, userData?: string) {
    const job = await this.jobRepo.findOne({ where: { id } });
    if (!job) return null;
    job.applicationCount += 1;
    await this.jobRepo.save(job);
    return {
      message: `Successfully applied for job with ID ${id}`,
      data: { jobId: id, userData },
      success: true,
    };
  }

  async getPopularJobs(
    limit: number,
    page: number,
    sortBy: string,
    order: string,
  ) {
    const validSortBy = ["viewCount", "applicationCount", "userMark"].includes(
      sortBy,
    )
      ? sortBy
      : "viewCount";
    const validOrder = ["asc", "desc"].includes(order.toLowerCase())
      ? order.toLowerCase()
      : "asc";

    const query = this.jobRepo
      .createQueryBuilder("job")
      .orderBy(`job.${validSortBy}`, validOrder === "asc" ? "ASC" : "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    return {
      message: "Popular jobs found",
      data: await query.getMany(),
      success: true,
    };
  }

  async viewJob(id: number) {
    const job = await this.jobRepo.findOne({ where: { id } });
    if (!job) return null;
    job.viewCount += 1;
    await this.jobRepo.save(job);
    return {
      message: `Successfully viewed job with ID ${id}`,
      data: { jobId: id },
      success: true,
    };
  }

  async markJob(id: number, mark: number) {
    const job = await this.jobRepo.findOne({ where: { id } });
    if (!job) return null;
    job.userMark = +(
      (job.userMark * job.userMarkCount + mark) /
      (job.userMarkCount + 1)
    ).toFixed(2);
    // job.userMark += mark;
    job.userMarkCount += 1;
    await this.jobRepo.save(job);
    return {
      message: `Successfully marked job with ID ${id}`,
      data: { jobId: id, mark },
      success: true,
    };
  }
}
