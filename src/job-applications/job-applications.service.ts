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
      relations: ["jobPosting", "jobSeeker",],
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
  async findOne(id: number) {
    const jobApplication = await this.jobApplicationsRepo.findOne({
      where: { id },
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
}
