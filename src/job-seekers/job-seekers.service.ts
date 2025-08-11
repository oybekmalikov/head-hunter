import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateJobSeekerDto } from "./dto/create-job-seeker.dto";
import { UpdateJobSeekerDto } from "./dto/update-job-seeker.dto";
import { JobSeeker } from "./entities/job-seeker.entity";

@Injectable()
export class JobSeekersService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepo: Repository<JobSeeker>,
  ) {}
  async create(createJobSeekerDto: CreateJobSeekerDto) {
    const jobSeeker =await this.jobSeekerRepo.save(createJobSeekerDto);
    return {
      message: "Job Seeker created successfully!",
      data: jobSeeker,
      success: true,
    };
  }

  async findAll() {
    const data = await this.jobSeekerRepo.find({ relations: ["user"] });
    if (!data || data.length === 0) {
      return {
        message: "No Job Seekers found!",
        success: false,
      };
    }
    return {
      message: "Job Seekers retrieved successfully!",
      data,
      success: true,
    };
  }

  async findOne(id: number) {
    const data = await this.jobSeekerRepo.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!data) {
      return {
        message: "Job Seeker not found!",
        success: false,
      };
    }
    return {
      message: "Job Seeker retrieved successfully!",
      data,
      success: true,
    };
  }

  async update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    const updated = await this.jobSeekerRepo.preload({
      id,
      ...updateJobSeekerDto,
    });
    if (!updated) {
      return {
        message: "Job Seeker not found!",
        success: false,
      };
    }
    return {
      message: "Job Seeker updated successfully! ",
      data: await this.jobSeekerRepo.save(updated),
      success: true,
    };
  }

  async remove(id: number) {
    const deleted = await this.jobSeekerRepo.delete({ id });
    if (!deleted.affected) {
      return {
        message: "Job Seeker not found!",
        success: false,
      };
    }
    return {
      message: "Job Seeker deleted successfully! ",
      data: { affected: deleted.affected },
      success: true,
    };
  }
}
