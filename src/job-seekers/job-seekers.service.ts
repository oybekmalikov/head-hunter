import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResumeUploadService } from "src/common/services/resume-upload.service";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { CreateJobSeekerDto } from "./dto/create-job-seeker.dto";
import { UpdateJobSeekerDto } from "./dto/update-job-seeker.dto";
import { JobSeeker } from "./entities/job-seeker.entity";

@Injectable()
export class JobSeekersService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepo: Repository<JobSeeker>,
    private readonly userService: UsersService,
    private readonly resumeUploadService: ResumeUploadService,
  ) {}
  async create(createJobSeekerDto: CreateJobSeekerDto) {
    const jobSeeker = await this.jobSeekerRepo.save(createJobSeekerDto);
    await this.userService.update(createJobSeekerDto.userId, {
      role: "jobseeker",
    });
    return {
      message: "Job Seeker created successfully!",
      data: jobSeeker,
      success: true,
    };
  }

  async findAll() {
    const data = await this.jobSeekerRepo.find({ relations: ["user"] });
    if (!data || data.length === 0) {
      return {
        message: "No Job Seekers found!",
        success: false,
      };
    }
    return {
      message: "Job Seekers retrieved successfully!",
      data,
      success: true,
    };
  }

  async findAllByPagination(page: number, limit: number) {
    const [data, total] = await this.jobSeekerRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
      relations: ["user"],
    });
    if (!data || data.length === 0) {
      return {
        message: "Job Seekers not found!",
        success: false,
      };
    }
    return {
      message: "Job Seekers retrieved successfully!",
      data,
      total,
      success: true,
    };
  }

  async findOne(id: number) {
    const data = await this.jobSeekerRepo.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!data) {
      return {
        message: "Job Seeker not found!",
        success: false,
      };
    }
    return {
      message: "Job Seeker retrieved successfully!",
      data,
      success: true,
    };
  }

  async update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    const updated = await this.jobSeekerRepo.preload({
      id,
      ...updateJobSeekerDto,
    });
    if (!updated) {
      return {
        message: "Job Seeker not found!",
        success: false,
      };
    }
    return {
      message: "Job Seeker updated successfully! ",
      data: await this.jobSeekerRepo.save(updated),
      success: true,
    };
  }

  async remove(id: number) {
    const deleted = await this.jobSeekerRepo.delete({ id });
    if (!deleted.affected) {
      return {
        message: "Job Seeker not found!",
        success: false,
      };
    }
    return {
      message: "Job Seeker deleted successfully! ",
      data: { affected: deleted.affected },
      success: true,
    };
  }
  async userProfile(id: number) {
    const user = await this.jobSeekerRepo.findOne({
      where: { userId: id },
      relations: [
        "user",
        "skills",
        "postings",
        "workExperience",
        "education",
        "applications",
      ],
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return {
      message: "Job Seeker profile retrieved successfully",
      data: user,
      success: true,
    };
  }

  async uploadResume(
    userId: number,
    file: Express.Multer.File,
    description?: string,
  ) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    const jobSeeker = await this.jobSeekerRepo.findOne({
      where: { userId },
    });

    if (!jobSeeker) {
      throw new NotFoundException("Job seeker not found");
    }

    const fileInfo = await this.resumeUploadService.saveResumeFile(file);
    if (jobSeeker.resumeFilename) {
      await this.resumeUploadService.deleteFile(jobSeeker.resumeFilename);
    }

    const updatedJobSeeker = await this.jobSeekerRepo.save({
      ...jobSeeker,
      resumeFilename: fileInfo.filename,
      resumeUrl: `${process.env.API_HOST}/${fileInfo.fileUrl}`,
    });
    console.log(fileInfo);
    return {
      message: "Resume uploaded successfully!",
      data: {
        filename: fileInfo.filename,
        originalName: fileInfo.originalName,
        fileUrl: `${process.env.API_HOST}${fileInfo.fileUrl}`,
        description,
      },
      success: true,
    };
  }

  async deleteResume(userId: number) {
    const jobSeeker = await this.jobSeekerRepo.findOne({
      where: { userId },
    });

    if (!jobSeeker) {
      throw new NotFoundException("Job seeker not found");
    }

    if (!jobSeeker.resumeFilename) {
      throw new BadRequestException("No resume file found to delete");
    }

    await this.resumeUploadService.deleteFile(jobSeeker.resumeFilename);

    const updatedJobSeeker = await this.jobSeekerRepo.save({
      ...jobSeeker,
      resumeUrl: "",
    });

    return {
      message: "Resume deleted successfully!",
      data: { affected: 1 },
      success: true,
    };
  }
}
