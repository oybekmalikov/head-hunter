import { Injectable } from '@nestjs/common';
import { CreateJobSeekerDto } from './dto/create-job-seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job-seeker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job-seeker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobSeekerService {
  constructor(@InjectRepository(JobSeeker) private readonly jobSeekerRepo: Repository<JobSeeker>) { }
  async create(createJobSeekerDto: CreateJobSeekerDto) {
    const jobSeeker = await this.jobSeekerRepo.findOneBy({ userId: createJobSeekerDto.userId });
    if (jobSeeker) {
      return {
        message: "Job Seeker already exists!",
        status: 400,
        success: false
      };
    }
    return {
      message: "Job Seeker created successfully!",
      jobSeeker: await this.jobSeekerRepo.save(createJobSeekerDto),
      status: 201,
      success: true
    };
  }

  findAll() {
    return {
      jobSeekers: this.jobSeekerRepo.find({ relations: ['user'] }),
      status: 200,
      success: true
    };
  }

  async findOne(id: number) {
    return {
      jobSeeker: await this.jobSeekerRepo.findOne({ where: { id }, relations: ['user'] }),
      status: 200,
      success: true
    };
  }

  async update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    const jobSeeker = await this.jobSeekerRepo.findOneBy({ userId: updateJobSeekerDto.userId });
    if (jobSeeker && jobSeeker.id === id) {
      return {
        message: "Job Seeker updated successfully! ",
        jobSeeker: await this.jobSeekerRepo.update(id, updateJobSeekerDto),
        status: 200,
        success: true
      };
    }
    return {
      message: "Job Seeker not found! ",
      jobSeeker: null,
      status: 404,
      success: false
    };
  }

  async remove(id: number) {
    const jobSeeker = await this.jobSeekerRepo.findOneBy({ id });
    if (!jobSeeker) {
      return {
        message: "Job Seeker not found! ",
        jobSeeker: null,
        status: 404,
        success: false
      };
    }
    return {
      message: "Job Seeker deleted successfully! ",
      jobSeeker: await this.jobSeekerRepo.delete(id),
      status: 200,
      success: true
    };
  }
}