import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateJobSeekerPostingDto } from "./dto/create-job-seeker-posting.dto";
import { UpdateJobSeekerPostingDto } from "./dto/update-job-seeker-posting.dto";
import { JobSeekerPostingService } from "./job-seeker-posting.service";

@ApiTags("Job Seeker Postings")
@Controller("job-seeker-posting")
export class JobSeekerPostingController {
  constructor(
    private readonly jobSeekerPostingService: JobSeekerPostingService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new job seeker posting",
    description: "Creates a new job seeker posting with the provided details.",
  })
  @ApiResponse({ status: 201, description: "Posting created successfully" })
  @ApiBody({ type: CreateJobSeekerPostingDto })
  create(@Body() createDto: CreateJobSeekerPostingDto) {
    return this.jobSeekerPostingService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all job seeker postings",
    description: "Retrieves a list of all job seeker postings.",
  })
  @ApiResponse({ status: 200, description: "All postings returned" })
  findAll() {
    return this.jobSeekerPostingService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a single job seeker posting by ID",
    description: "Retrieves a single job seeker posting by its ID.",
  })
  @ApiResponse({ status: 200, description: "Posting found" })
  findOne(@Param("id") id: string) {
    return this.jobSeekerPostingService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a job seeker posting by ID",
    description: "Update a job seeker posting by ID",
  })
  @ApiResponse({ status: 200, description: "Posting updated" })
  update(
    @Param("id") id: string,
    @Body() updateDto: UpdateJobSeekerPostingDto,
  ) {
    return this.jobSeekerPostingService.update(+id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a job seeker posting by ID",
    description: "Delete a job seeker posting by ID",
  })
  @ApiResponse({ status: 200, description: "Posting deleted" })
  remove(@Param("id") id: string) {
    return this.jobSeekerPostingService.remove(+id);
  }
}
