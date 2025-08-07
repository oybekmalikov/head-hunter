import { Injectable } from "@nestjs/common";
import { CreateJobSeekerPostingDto } from "./dto/create-job-seeker-posting.dto";
import { UpdateJobSeekerPostingDto } from "./dto/update-job-seeker-posting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { JobSeekerPosting } from "./entities/job-seeker-posting.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobSeekerPostingService {
  constructor(
    @InjectRepository(JobSeekerPosting)
    private jobSeekerPostingRepo: Repository<JobSeekerPosting>,
    private jobSeekerService: JobSeekerService,
    private skillService: SkillService
  ) {}

  create(createJobSeekerPostingDto: CreateJobSeekerPostingDto) {
    const jobSeeker = this.jobSeekerService.findOne(
      createJobSeekerPostingDto.job_seeker_id
    );
    const skillsId = this.skillService.findOne(
      createJobSeekerPostingDto.skills_id
    );
    if (jobSeeker && skillsId) {
      const jobSeekerPosting = this.jobSeekerPostingRepo.create(
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

  findAll() {
    return {
      message: "Job Seeker Postings retrieved successfully",
      data: this.jobSeekerPostingRepo.find(),
      success: true,
    };
  }

  findOne(id: number) {
    return {
      message: "Job Seeker Posting retrieved successfully",
      data: this.jobSeekerPostingRepo.findOne({ where: { id } }),
      success: true,
    };
  }

  update(id: number, updateJobSeekerPostingDto: UpdateJobSeekerPostingDto) {
    const jobSeeker = this.jobSeekerService.findOne(
      updateJobSeekerPostingDto.job_seeker_id
    );
    const skillsId = this.skillService.findOne(
      updateJobSeekerPostingDto.skills_id
    );
    if (jobSeeker && skillsId) {
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

  remove(id: number) {
    return {
      message: "Job Seeker Posting deleted successfully",
      data: this.jobSeekerPostingRepo.delete(id),
      success: true,
    };
  }
}
