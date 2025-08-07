import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobSeekerSkill } from "./entities/job-seeker-skill.entity";
import { CreateJobSeekerSkillDto } from "./dto/create-job-seeker-skill.dto";
import { UpdateJobSeekerSkillDto } from "./dto/update-job-seeker-skill.dto";
import { JobSeekerService } from "src/job-seeker/job-seeker.service";
import { SkillService } from "src/skill/skill.service";

@Injectable()
export class JobSeekerSkillsService {
  constructor(
    @InjectRepository(JobSeekerSkill)
    private jobSeekerSkillsRepo: Repository<JobSeekerSkill>,
    private jobSeekerService: JobSeekerService,
    private skillService: SkillService
  ) {}

  async create(createJobSeekerSkillDto: CreateJobSeekerSkillDto) {
    const jobSeeker = await this.jobSeekerService.findOne(
      createJobSeekerSkillDto.job_seeker_id
    );
    const skill = await this.skillService.findOne(
      createJobSeekerSkillDto.skill_id
    );

    if (jobSeeker && skill) {
      const jobSeekerSkill = this.jobSeekerSkillsRepo.create(
        createJobSeekerSkillDto
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
    const jobSeeker = await this.jobSeekerService.findOne(
      updateDto.job_seeker_id
    );
    const skill = await this.skillService.findOne(updateDto.skill_id);

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
