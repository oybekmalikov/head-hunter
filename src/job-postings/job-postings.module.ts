import { Module } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { JobPostingsController } from './job-postings.controller';
import { JobPosting } from './entities/job-posting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCategory } from 'src/job-category/entities/job_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting, JobCategory])],
  controllers: [JobPostingsController],
  providers: [JobPostingsService],
})
export class JobPostingsModule {}
