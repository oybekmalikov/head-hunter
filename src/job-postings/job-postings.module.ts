import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobPosting } from "./entities/job-posting.entity";
import { JobPostingsController } from "./job-postings.controller"
import { JobPostingsService } from "./job-postings.service"
import { JobCategory } from "../job-category/entities/job_category.entity"
import { Company } from "../company/entities/company.entity"
import { Employer } from "../employers/entities/employer.entity"

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting,JobCategory,Employer,Company])],
  controllers: [JobPostingsController],
  providers: [JobPostingsService],
  exports: [TypeOrmModule],
})
export class JobPostingsModule {}
