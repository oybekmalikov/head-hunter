import { Module } from "@nestjs/common";
import { JobSeekerPostingService } from "./job-seeker-posting.service";
import { JobSeekerPostingController } from "./job-seeker-posting.controller";
import { JobSeekerModule } from "src/job-seeker/job-seeker.module";
@Module({
  imports: [JobSeekerModule],
  controllers: [JobSeekerPostingController],
  providers: [JobSeekerPostingService],
})
export class JobSeekerPostingModule {}
