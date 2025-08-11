import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSavedJobDto } from "./dto/create-saved-job.dto";
import { UpdateSavedJobDto } from "./dto/update-saved-job.dto";
import { SavedJob } from "./entities/saved-job.entity";

@Injectable()
export class SavedJobsService {
  constructor(
    @InjectRepository(SavedJob) private savedJobRepo: Repository<SavedJob>,
  ) {}

  async create(createSavedJobDto: CreateSavedJobDto) {
    const savedJob = await this.savedJobRepo.save(createSavedJobDto);
    return {
      message: "Saved job created successfully",
      data: savedJob,
      success: true,
    };
  }

  async findAll() {
    const savedJobs = await this.savedJobRepo.find({
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!savedJobs || savedJobs.length === 0) {
      return {
        message: "No saved jobs found",
        data: [],
        success: false,
      };
    }
    return {
      message: "Saved jobs retrieved successfully",
      data: savedJobs,
      success: true,
    };
  }

  async findOne(id: number) {
    const savedJob = await this.savedJobRepo.findOne({
      where: { id },
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!savedJob) {
      return {
        message: `Saved job with id ${id} not found`,
        data: null,
        success: false,
      };
    }
    return {
      message: "Saved job retrieved successfully",
      data: savedJob,
      success: true,
    };
  }

  async update(id: number, updateSavedJobDto: UpdateSavedJobDto) {
    const updatedSavedJob = await this.savedJobRepo.preload({
      id,
      ...updateSavedJobDto,
    });
    if (!updatedSavedJob) {
      return {
        message: `Saved job with id ${id} not found`,
        data: null,
        success: false,
      };
    }
    return {
      message: "Saved job updated successfully",
      data: this.savedJobRepo.save(updatedSavedJob),
      success: true,
    };
  }

  async remove(id: number) {
    const deletedSavedJob = await this.savedJobRepo.delete(id);
    if (deletedSavedJob.affected === 0) {
      return {
        message: `Saved job with id ${id} not found`,
        success: false,
      };
    }
    return {
      message: "Saved job deleted successfully",
      data: { affected: deletedSavedJob.affected },
      success: true,
    };
  }

  async findByJobSeekerId(jobSeekerId: number) {
    const savedJobs = await this.savedJobRepo.find({
      where: { jobSeekerId },
      relations: ["jobPosting", "jobSeeker"],
    });
    if (!savedJobs || savedJobs.length === 0) {
      return {
        message: "No saved jobs found for this job seeker",
        success: false,
      };
    }
    return {
      message: "Saved jobs retrieved successfully",
      data: savedJobs,
      success: true,
    };
  }
}
