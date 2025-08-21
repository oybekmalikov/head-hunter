import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobSeekersService } from "../job-seekers/job-seekers.service";
import { CreateEduDto } from "./dto/create-edu.dto";
import { UpdateEduDto } from "./dto/update-edu.dto";
import { Edu } from "./entities/edu.entity";

@Injectable()
export class EduService {
  constructor(
    @InjectRepository(Edu)
    private eduRepo: Repository<Edu>,
    private jobSeekerService: JobSeekersService,
  ) {}

  async create(createEduDto: CreateEduDto) {
    const jobSeeker = await this.jobSeekerService.findOne(
      createEduDto.jobSeekerId,
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
      success: false,
    };
  }

  async findAll() {
    const data = await this.eduRepo.find({ relations: ["jobSeeker"] });
    if (data.length === 0) {
      return {
        message: "No Edu records found",
        success: false,
      };
    }
    return {
      message: "Edu records retrieved successfully",
      data,
      success: true,
    };
  }

  async findOne(id: number) {
    const data = await this.eduRepo.findOne({
      where: { id },
      relations: ["jobSeeker"],
    });
    if (!data) {
      return {
        message: "Edu record not found",
        success: false,
      };
    }
    return {
      message: "Edu record retrieved successfully",
      data,
      success: true,
    };
  }

  async update(id: number, updateEduDto: UpdateEduDto) {
    const updated = await this.eduRepo.preload({ id, ...updateEduDto });
    if (!updated) {
      return {
        message: "Edu record not found for update",
        success: false,
      };
    }
    return {
      message: "Edu updated successfully",
      data: await this.eduRepo.save(updated),
      success: true,
    };
  }

  async remove(id: number) {
    const deleted = await this.eduRepo.delete({ id });
    if (deleted.affected === 0) {
      return {
        message: "Edu record not found for deletion",
        success: false,
      };
    }
    // await this.jobSeekerService.removeEduFromJobSeeker(id);
    return {
      message: "Edu deleted successfully",
      data: { affected: deleted.affected },
      success: true,
    };
  }

  async getAllEducationByJobSeekerId(jobSeekerId: number) {
    const data = await this.eduRepo.find({
      where: { jobSeekerId },
      relations: ["jobSeeker"],
    });
    if (data.length === 0) {
      return {
        message: "No Edu records found",
        success: false,
      };
    }
    return {
      message: "Edu records retrieved successfully",
      data,
      success: true,
    };
  }
}
