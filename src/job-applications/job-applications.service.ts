import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateJobApplicationDto } from "./dto/create-job-application.dto";
import { UpdateJobApplicationDto } from "./dto/update-job-application.dto";
import { JobApplication } from "./entities/job-application.entity";

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private jobApplicationsRepo: Repository<JobApplication>,
  ) {}
  async create(createJobApplicationDto: CreateJobApplicationDto) {
    const jobApplication = await this.jobApplicationsRepo.save(
      createJobApplicationDto,
    );
    return {
      message: "Job application created successfully",
      data: jobApplication,
      success: true,
    };
  }
  async findAll() {
    const jobApplications = await this.jobApplicationsRepo.find({
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message: "No job applications found",
        data: [],
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: jobApplications,
      success: true,
    };
  }
  async findOne(id: number, userId?: number, role?: string) {
    let where: any = { id };
    if (role && role === "employer") {
      where = { ...where, jobPosting: { employerId: userId } };
    } else if (role && role === "jobseeker" && userId) {
      where = { ...where, jobSeekerId: userId };
    }
    const jobApplication = await this.jobApplicationsRepo.findOne({
      where,
      relations: ["jobPosting", "jobSeeker"],
    });

    if (!jobApplication) {
      return {
        message: `Job application with id ${id} not found`,
        success: false,
      };
    }
    return {
      message: "Job application retrieved successfully",
      data: jobApplication,
      success: true,
    };
  }

  async update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    const jobApplication = await this.jobApplicationsRepo.preload({
      id,
      ...updateJobApplicationDto,
    });
    if (!jobApplication) {
      return {
        message: `Job application with id ${id} not found`,
        success: false,
      };
    }
    return {
      message: "Job application updated successfully",
      data: await this.jobApplicationsRepo.save(jobApplication),
      success: true,
    };
  }

  async remove(id: number) {
    const result = await this.jobApplicationsRepo.delete({ id });
    if (result.affected === 0) {
      return {
        message: `Job application with id ${id} not found`,
        success: false,
      };
    }
    return {
      message: "Job application deleted successfully",
      data: { affacted: result.affected },
      success: true,
    };
  }

  async findAllAplicationsByJobSeekerId(jobSeekerId: number) {
    const jobApplications = await this.jobApplicationsRepo.find({
      where: { jobSeekerId: jobSeekerId },
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message: "No job applications found for this job seeker",
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: jobApplications,
      success: true,
    };
  }

  async findAllAplicationsByJobSeekerIdAndPagination(
    jobSeekerId: number,
    page: number,
    limit: number,
  ) {
    const [jobApplications, total] =
      await this.jobApplicationsRepo.findAndCount({
        where: { jobSeekerId: jobSeekerId },
        relations: ["jobPosting", "jobSeeker"],
        skip: (page - 1) * limit,
        take: limit,
      });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message: "No job applications found for this job seeker",
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: { data: jobApplications, total, page, limit },
      success: true,
    };
  }

  async findAllApplicationsByJobSeekerIdAndStatus(
    jobSeekerId: number,
    status: string,
  ) {
    const jobApplications = await this.jobApplicationsRepo.find({
      where: { jobSeekerId: jobSeekerId, status: status },
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message: `No job applications found for this job seeker with status ${status}`,
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: jobApplications,
      success: true,
    };
  }

  async findAllApplicationsByJobPostingId(
    jobPostingId: number,
    userId?: number,
    role?: string,
  ) {
    let where: any = { jobPostingId: jobPostingId };
    if (role && role === "employer" && userId) {
      where = { ...where, jobPosting: { employerId: userId } };
    }
    const jobApplications = await this.jobApplicationsRepo.find({
      where,
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message: "No job applications found for this job posting",
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: jobApplications,
      success: true,
    };
  }

  async findAllApplicationsByJobPostingIdAndStatus(
    jobPostingId: number,
    status: string,
    userId?: number,
    role?: string,
  ) {
    let where: any = { jobPostingId: jobPostingId, status: status };
    if (role && role === "employer" && userId) {
      where = { ...where, jobPosting: { employerId: userId } };
    }
    const jobApplications = await this.jobApplicationsRepo.find({
      where,
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message: `No job applications found for this job posting with status ${status}`,
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: jobApplications,
      success: true,
    };
  }

  async findAllApplicationsByJobPostingIdAndJobSeekerId(
    jobPostingId: number,
    jobSeekerId: number,
  ) {
    const jobApplications = await this.jobApplicationsRepo.find({
      where: { jobPostingId: jobPostingId, jobSeekerId: jobSeekerId },
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message:
          "No job applications found for this job posting and job seeker",
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: jobApplications,
      success: true,
    };
  }

  async findAllApllicationsByJobPostingsCategoryId(
    categoryId: number,
    jobSeekerId: number,
  ) {
    const jobApplications = await this.jobApplicationsRepo.find({
      where: {
        jobPosting: { categoryId: categoryId },
        jobSeekerId: jobSeekerId,
      },
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message: `No job applications found for this category with id ${categoryId}`,
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: jobApplications,
      success: true,
    };
  }
  async findAllApplicationsByEmployerId(employerId: number) {
    const jobApplications = await this.jobApplicationsRepo.find({
      where: { jobPosting: { employerId: employerId } },
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!jobApplications || jobApplications.length === 0) {
      return {
        message: "No job applications found for this employer",
        success: false,
      };
    }
    return {
      message: "Job applications retrieved successfully",
      data: jobApplications,
      success: true,
    };
  }
}
