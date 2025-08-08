import { Module } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './entities/job-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication])],
  providers: [JobApplicationsService],
  controllers: [JobApplicationsController],
  exports: [JobApplicationsService]
})
export class JobApplicationsModule {}
