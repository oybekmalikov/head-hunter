import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SavedJob } from "./entities/saved-job.entity";
import { SavedJobsController } from "./saved-jobs.controller";
import { SavedJobsService } from "./saved-jobs.service";

@Module({
  imports: [TypeOrmModule.forFeature([SavedJob])],
  controllers: [SavedJobsController],
  providers: [SavedJobsService],
  exports: [SavedJobsService],
})
export class SavedJobsModule {}
