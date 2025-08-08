import { Injectable } from "@nestjs/common";
import { CreateJobSeekerPostingDto } from "./dto/create-job-seeker-posting.dto";
import { UpdateJobSeekerPostingDto } from "./dto/update-job-seeker-posting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { JobSeekerPosting } from "./entities/job-seeker-posting.entity";
import { Repository } from "typeorm";
import { SkillsService } from "../skills/skills.service";
import { JobSeekerService } from "../job-seekers/job-seekers.service";

@Injectable()
export class JobSeekerPostingService {
  constructor(
    @InjectRepository(JobSeekerPosting)
    private jobSeekerPostingRepo: Repository<JobSeekerPosting>,
    private jobSeekerService: JobSeekerService,
    private skillService: SkillsService
  ) { }

  async create(createJobSeekerPostingDto: CreateJobSeekerPostingDto) {
    const jobSeeker = await this.jobSeekerService.findOne(
      +createJobSeekerPostingDto.jobSeekerId
    );
    const skillsId = await this.skillService.findOne(
      +createJobSeekerPostingDto.skillsId
    );
    if (jobSeeker && +skillsId) {
      const jobSeekerPosting = this.jobSeekerPostingRepo.save(
        createJobSeekerPostingDto
      );
      return {
        message: "Job Seeker Posting created successfully",
        data: jobSeekerPosting,
        success: true,
      };
    }
    return {
      message: "Job Seeker or Skill not found",
      data: null,
      success: false,
    };
  }

  async findAll() {
    return {
      message: "Job Seeker Postings retrieved successfully",
      data: await this.jobSeekerPostingRepo.find(),
      success: true,
    };
  }

  async findOne(id: number) {
    return {
      message: "Job Seeker Posting retrieved successfully",
      data: await this.jobSeekerPostingRepo.findOne({ where: { id } }),
      success: true,
    };
  }

  async update(id: number, updateJobSeekerPostingDto: UpdateJobSeekerPostingDto) {
    const jobSeeker = await this.jobSeekerService.findOne(
      Number(updateJobSeekerPostingDto.jobSeekerId)
    );
    const skillsId = await this.skillService.findOne(
      Number(updateJobSeekerPostingDto.skillsId)
    );
    if (jobSeeker && +skillsId) {
      return {
        message: "Job Seeker Posting updated successfully",
        data: this.jobSeekerPostingRepo.update(id, updateJobSeekerPostingDto),
        success: true,
      };
    }
    return {
      message: "Job Seeker or Skill not found",
      data: null,
      success: false,
    };
  }

  async remove(id: number) {
    const jobSeekerPosting = this.jobSeekerPostingRepo.findOneBy({ id });
    if (!jobSeekerPosting) {
      return {
        message: "Job Seeker Posting not found",
        data: null,
        success: false,
      }
    }
    return {
      message: "Job Seeker Posting deleted successfully",
      data: await this.jobSeekerPostingRepo.delete(id),
      success: true,
    };

  }
}
