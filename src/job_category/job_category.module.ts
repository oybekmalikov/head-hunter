import { Module } from '@nestjs/common';
import { JobCategoryService } from './job_category.service';
import { JobCategoryController } from './job_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCategory } from './entities/job_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobCategory])],
  controllers: [JobCategoryController],
  providers: [JobCategoryService],
})
export class JobCategoryModule {}
