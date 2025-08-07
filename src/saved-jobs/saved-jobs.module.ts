import { Module } from '@nestjs/common';
import { SavedJobsService } from './saved-jobs.service';
import { SavedJobsController } from './saved-jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedJob } from './entities/saved-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavedJob])],
  controllers: [SavedJobsController],
  providers: [SavedJobsService],
})
export class SavedJobsModule {}
