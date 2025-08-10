import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobSeekersService } from "../job-seekers/job-seekers.service";
import { SkillsService } from "../skills/skills.service";
import { CreateJobSeekerPostingDto } from "./dto/create-job-seeker-posting.dto";
import { UpdateJobSeekerPostingDto } from "./dto/update-job-seeker-posting.dto";
import { JobSeekerPosting } from "./entities/job-seeker-posting.entity";

@Injectable()
export class JobSeekerPostingService {
  constructor(
    @InjectRepository(JobSeekerPosting)
    private jobSeekerPostingRepo: Repository<JobSeekerPosting>,
    private jobSeekerService: JobSeekersService,
  ) {}

  async create(createJobSeekerPostingDto: CreateJobSeekerPostingDto) {
    const jobSeekerResp = await this.jobSeekerService.findOne(
      Number(createJobSeekerPostingDto.jobSeekerId),
    );
    if (jobSeekerResp) {
      const jobSeekerPosting = this.jobSeekerPostingRepo.create({
        ...createJobSeekerPostingDto,
        jobSeekerId: Number(createJobSeekerPostingDto.jobSeekerId),
      });
      const saved = await this.jobSeekerPostingRepo.save(jobSeekerPosting);
      return {
        message: "Job Seeker Posting created successfully",
        data: saved,
        success: true,
      };
    }
    return {
      message: "Job Seeker or Skill not found",
      success: false,
    };
  }

  async findAll() {
    const data = await this.jobSeekerPostingRepo.find({
      relations: ["jobSeeker", "jobSeekerSkills"],
    });
    if (data.length === 0 || !data) {
      return {
        message: "No job seeker postings found",
        success: false,
      };
    }
    return {
      message: "Job Seeker Postings retrieved successfully",
      data,
      success: true,
    };
  }

  async findOne(id: number) {
    const data = await this.jobSeekerPostingRepo.findOne({
      where: { id },
      relations: ["jobSeeker", "jobSeekerSkills"],
    });
    if (!data) {
      return {
        message: "Job Seeker Posting not found",
        success: false,
      };
    }
    return {
      message: "Job Seeker Posting retrieved successfully",
      data,
      success: true,
    };
  }

  async update(
    id: number,
    updateJobSeekerPostingDto: UpdateJobSeekerPostingDto,
  ) {
    let jobSeeker: any = null;
    let skill: any = null;
    if (updateJobSeekerPostingDto.jobSeekerId !== undefined) {
      const jsResp = await this.jobSeekerService.findOne(
        Number(updateJobSeekerPostingDto.jobSeekerId),
      );
      jobSeeker = jsResp && (await (jsResp as any).jobSeeker);
    }

    if (updateJobSeekerPostingDto.jobSeekerId === undefined || jobSeeker) {
      const updated = await this.jobSeekerPostingRepo.preload({
        id,
        ...updateJobSeekerPostingDto,
      });
      return {
        message: "Job Seeker Posting updated successfully",
        data: await this.jobSeekerPostingRepo.save(updated!),
        success: true,
      };
    }
    return {
      message: "Job Seeker or Skill not found",
      success: false,
    };
  }

  async remove(id: number) {
    const deleted = await this.jobSeekerPostingRepo.delete({ id });
    if (deleted.affected === 0) {
      return {
        message: "Job Seeker Posting not found for deletion",
        success: false,
      };
    }
    return {
      message: "Job Seeker Posting deleted successfully",
      data: { affected: deleted.affected },
      success: true,
    };
  }
}
