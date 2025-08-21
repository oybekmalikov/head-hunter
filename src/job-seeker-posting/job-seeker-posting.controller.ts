import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { CreateJobSeekerPostingDto } from "./dto/create-job-seeker-posting.dto";
import { UpdateJobSeekerPostingDto } from "./dto/update-job-seeker-posting.dto";
import { JobSeekerPostingService } from "./job-seeker-posting.service";

@ApiTags("Job Seeker Postings")
@Controller("job-seeker-posting")
export class JobSeekerPostingController {
  constructor(
    private readonly jobSeekerPostingService: JobSeekerPostingService,
  ) {}

  @ApiOperation({ summary: "Get all job seeker posting by jobb seeeker id" })
  @UseGuards(AuthGuard)
  @Get("job-seeker/:id")
  getJobSeekerPosting(@Param("id") id: string) {
    return this.jobSeekerPostingService.getAllJobSeekerPostings(+id);
  }

  @ApiOperation({ summary: "Get all job seeker posting by salary" })
  @UseGuards(AuthGuard)
  @Get("filter/salary/min/:min/max/:max")
  getJobSeekerPostingBySalary(
    @Param("min") min: string,
    @Param("max") max: string,
  ) {
    return this.jobSeekerPostingService.getJobSeekersWithSalary(+min, +max);
  }

  @ApiOperation({ summary: "Get all job seeker posting by city" })
  @UseGuards(AuthGuard)
  @Get("filter/city/:name")
  getJobSeekerPostingByCity(@Param("name") name: string) {
    return this.jobSeekerPostingService.getAllJobSeekerPostingsByCity(name);
  }

  @ApiOperation({ summary: "Get all job seeker posting by skills" })
  @UseGuards(AuthGuard)
  @Get("filter/skills")
  getJobSeekerPostingBySkills(@Body("skills") skills: string[]) {
    return this.jobSeekerPostingService.getAllJobSeekerPostingsBySkills(skills);
  }

  @ApiOperation({
    summary: "Create a new job seeker posting",
    description: "Creates a new job seeker posting with the provided details.",
  })
  @ApiResponse({ status: 201, description: "Posting created successfully" })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createDto: CreateJobSeekerPostingDto, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "jobseeker" || user.role === "superadmin") {
      return this.jobSeekerPostingService.create(createDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all job seeker postings",
    description: "Retrieves a list of all job seeker postings.",
  })
  @ApiResponse({ status: 200, description: "All postings returned" })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.jobSeekerPostingService.findAll();
  }

  @ApiOperation({
    summary: "Get a single job seeker posting by ID",
    description: "Retrieves a single job seeker posting by its ID.",
  })
  @ApiResponse({ status: 200, description: "Posting found" })
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobSeekerPostingService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update a job seeker posting by ID",
    description: "Update a job seeker posting by ID",
  })
  @ApiResponse({ status: 200, description: "Posting updated" })
  @UseGuards(new SelfGuard("id", "id"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDto: UpdateJobSeekerPostingDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (
      user.role === "jobseeker" ||
      user.role === "admin" ||
      user.role === "superadmin"
    ) {
      return this.jobSeekerPostingService.update(+id, updateDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Delete a job seeker posting by ID",
    description: "Delete a job seeker posting by ID",
  })
  @ApiResponse({ status: 200, description: "Posting deleted" })
  @UseGuards(new SelfGuard("id", "id"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (
      user.role === "jobseeker" ||
      user.role === "admin" ||
      user.role === "superadmin"
    ) {
      return this.jobSeekerPostingService.remove(+id);
    }
    throw new ForbiddenException("Access denied");
  }
}
