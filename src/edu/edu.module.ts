import { Module } from "@nestjs/common";
import { EduService } from "./edu.service";
import { EduController } from "./edu.controller";
import { JonSeekerModule } from "src/job-seeker/job-seeker.module";

@Module({
  imports: [JonSeekerModule],
  controllers: [EduController],
  providers: [EduService],
})
export class EduModule {}
