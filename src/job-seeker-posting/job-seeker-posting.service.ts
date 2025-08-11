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
    private skillService: SkillsService,
  ) {}

  async create(createJobSeekerPostingDto: CreateJobSeekerPostingDto) {
    const jobSeekerResp = await this.jobSeekerService.findOne(
      Number(createJobSeekerPostingDto.jobSeekerId),
    );
    const skillResp = await this.skillService.findOne(
      Number(createJobSeekerPostingDto.skillsId),
    );

    // JobSeekerService returns { jobSeeker, status }
    const jobSeeker = jobSeekerResp && (await (jobSeekerResp as any).jobSeeker);
    // SkillsService returns { success, data }
    const skill = (skillResp as any)?.success ? (skillResp as any).data : null;

    if (jobSeeker && skill) {
      const jobSeekerPosting = this.jobSeekerPostingRepo.create(
        createJobSeekerPostingDto,
      );
      const saved = await this.jobSeekerPostingRepo.save(jobSeekerPosting);
      return {
        message: "Job Seeker Posting created successfully",
        data: saved,
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

  async findOne(id: number) {
    return {
      message: "Job Seeker Posting retrieved successfully",
      data: await this.jobSeekerPostingRepo.findOne({ where: { id } }),
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
    if (updateJobSeekerPostingDto.skillsId !== undefined) {
      const skResp = await this.skillService.findOne(
        Number(updateJobSeekerPostingDto.skillsId),
      );
      skill = (skResp as any)?.success ? (skResp as any).data : null;
    }
    if (
      (updateJobSeekerPostingDto.jobSeekerId === undefined || jobSeeker) &&
      (updateJobSeekerPostingDto.skillsId === undefined || skill)
    ) {
      await this.jobSeekerPostingRepo.update(id, updateJobSeekerPostingDto);
      const updated = await this.jobSeekerPostingRepo.findOne({
        where: { id },
      });
      return {
        message: "Job Seeker Posting updated successfully",
        data: updated,
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
