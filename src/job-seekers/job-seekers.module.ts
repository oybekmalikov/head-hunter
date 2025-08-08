import { Module } from '@nestjs/common';
import { JobSeekerService } from './job-seekers.service';
import { JobSeekersController } from './job-seekers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job-seeker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeeker])],
  controllers: [JobSeekersController],
  providers: [JobSeekerService],
  exports: [JobSeekerService]
})
export class JobSeekersModule { }