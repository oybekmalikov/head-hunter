import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobSeekersService } from "../job-seekers/job-seekers.service";
import { SkillsService } from "../skills/skills.service";
import { CreateJobSeekerSkillDto } from "./dto/create-job-seeker-skill.dto";
import { UpdateJobSeekerSkillDto } from "./dto/update-job-seeker-skill.dto";
import { JobSeekerSkill } from "./entities/job-seeker-skill.entity";

@Injectable()
export class JobSeekerSkillsService {
  constructor(
    @InjectRepository(JobSeekerSkill)
    private jobSeekerSkillsRepo: Repository<JobSeekerSkill>,
    private jobSeekerService: JobSeekersService,
    private skillService: SkillsService,
  ) {}

  async create(createJobSeekerSkillDto: CreateJobSeekerSkillDto) {
    const jobSeeker = await this.jobSeekerService.findOne(
      createJobSeekerSkillDto.jobSeekerId,
    );
    const skill = await this.skillService.findOne(
      createJobSeekerSkillDto.skillId,
    );

    if (jobSeeker && skill) {
      const jobSeekerSkill = this.jobSeekerSkillsRepo.create(
        createJobSeekerSkillDto,
      );
      await this.jobSeekerSkillsRepo.save(jobSeekerSkill);
      return {
        message: "Job Seeker Skill created successfully",
        data: jobSeekerSkill,
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
    const data = await this.jobSeekerSkillsRepo.find();
    return {
      message: "Job Seeker Skills retrieved successfully",
      data,
      success: true,
    };
  }

  async findOne(id: number) {
    const data = await this.jobSeekerSkillsRepo.findOne({ where: { id } });
    return {
      message: "Job Seeker Skill retrieved successfully",
      data,
      success: true,
    };
  }

  async update(id: number, updateDto: UpdateJobSeekerSkillDto) {
    const jobSeeker =
      updateDto.jobSeekerId !== undefined
        ? await this.jobSeekerService.findOne(updateDto.jobSeekerId as number)
        : null;
    const skill =
      updateDto.jobSeekerId !== undefined
        ? await this.skillService.findOne(updateDto.skillId as number)
        : null;

    if (jobSeeker && skill) {
      await this.jobSeekerSkillsRepo.update(id, updateDto);
      const updated = await this.jobSeekerSkillsRepo.findOne({ where: { id } });
      return {
        message: "Job Seeker Skill updated successfully",
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

  async remove(id: number) {
    await this.jobSeekerSkillsRepo.delete(id);
    return {
      message: "Job Seeker Skill deleted successfully",
      data: null,
      success: true,
    };
  }
}
