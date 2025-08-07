import { Module } from '@nestjs/common';
import { JobSeekersService } from './job-seekers.service';
import { JobSeekersController } from './job-seekers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job-seeker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeeker])],
  controllers: [JobSeekersController],
  providers: [JobSeekersService],
})
export class JobSeekersModule {}
