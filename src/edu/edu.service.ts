import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Edu } from "./entities/edu.entity";
import { CreateEduDto } from "./dto/create-edu.dto";
import { UpdateEduDto } from "./dto/update-edu.dto";
import { JobSeekerService } from "src/job-seeker/job-seeker.service";

@Injectable()
export class EduService {
  constructor(
    @InjectRepository(Edu)
    private eduRepo: Repository<Edu>,
    private jobSeekerService: JobSeekerService
  ) {}

  async create(createEduDto: CreateEduDto) {
    const jobSeeker = await this.jobSeekerService.findOne(
      createEduDto.job_seeker_id
    );

    if (jobSeeker) {
      const edu = this.eduRepo.create(createEduDto);
      await this.eduRepo.save(edu);
      return {
        message: "Edu created successfully",
        data: edu,
        success: true,
      };
    }

    return {
      message: "Job Seeker not found",
      data: null,
      success: false,
    };
  }

  async findAll() {
    const data = await this.eduRepo.find();
    return {
      message: "Edu records retrieved successfully",
      data,
      success: true,
    };
  }

  async findOne(id: number) {
    const data = await this.eduRepo.findOne({ where: { id } });
    return {
      message: "Edu record retrieved successfully",
      data,
      success: true,
    };
  }

  async update(id: number, updateEduDto: UpdateEduDto) {
    await this.eduRepo.update(id, updateEduDto);
    const updated = await this.eduRepo.findOne({ where: { id } });
    return {
      message: "Edu updated successfully",
      data: updated,
      success: true,
    };
  }

  async remove(id: number) {
    await this.eduRepo.delete(id);
    return {
      message: "Edu deleted successfully",
      data: null,
      success: true,
    };
  }
}
