import { Injectable } from '@nestjs/common';
import { CreateJobSeekerDto } from './dto/create-job-seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job-seeker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job-seeker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobSeekersService {
  constructor(@InjectRepository(JobSeeker) private readonly jobSeekerRepo: Repository<JobSeeker>) { }
  async create(createJobSeekerDto: CreateJobSeekerDto) {
    return {
      message: "Job Seeker created successfully!",
      jobSeeker: await this.jobSeekerRepo.save(createJobSeekerDto),
      status: 201
    };
  }

  findAll() {
    return {
      jobSeekers: this.jobSeekerRepo.find({ relations: ['user'] }),
      status: 200
    };
  }

  findOne(id: number) {
    return {
      jobSeeker: this.jobSeekerRepo.findOne({ where: { id }, relations: ['user'] }),
      status: 200
    };
  }

  update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    return {
      message: "Job Seeker updated successfully! ",
      jobSeeker: this.jobSeekerRepo.update(id, updateJobSeekerDto),
      status: 200
    };
  }

  remove(id: number) {
    return {
      message: "Job Seeker deleted successfully! ",
      jobSeeker: this.jobSeekerRepo.delete(id),
      status: 200
    };
  }
}
