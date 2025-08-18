import { PartialType } from "@nestjs/swagger";
import { CreateJobSeekerPostingDto } from "./create-job-seeker-posting.dto";

export class UpdateJobSeekerPostingDto extends PartialType(
  CreateJobSeekerPostingDto,
) {}
