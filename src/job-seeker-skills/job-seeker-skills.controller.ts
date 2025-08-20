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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { CreateJobSeekerSkillDto } from "./dto/create-job-seeker-skill.dto";
import { UpdateJobSeekerSkillDto } from "./dto/update-job-seeker-skill.dto";
import { JobSeekerSkillsService } from "./job-seeker-skills.service";

@Controller("job-seeker-skills")
export class JobSeekerSkillsController {
  constructor(
    private readonly jobSeekerSkillsService: JobSeekerSkillsService,
  ) {}

  @ApiOperation({
    summary: "Get all job seeker skills",
    description: "Get all job seeker skills",
  })
  @ApiResponse({
    status: 200,
    description: "The list of all job seeker skills.",
  })
  @UseGuards(AuthGuard)
  @Get("job-seeker/:id")
  getAllSkillsByJobSeekerId(@Param("id") id: string) {
    return this.jobSeekerSkillsService.getAllSkillsByJobSeekerId(+id);
  }

  @ApiOperation({
    summary: "Create a new job seeker skill",
    description: "Create a new job seeker skill",
  })
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createJobSeekerSkillDto: CreateJobSeekerSkillDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "jobseeker"||user.role === "superadmin") {
      return this.jobSeekerSkillsService.create(createJobSeekerSkillDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all job seeker skills",
    description: "Get all job seeker skills",
  })
  @ApiResponse({
    status: 200,
    description: "The list of all job seeker skills.",
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.jobSeekerSkillsService.findAll();
  }

  @ApiOperation({
    summary: "Get a job seeker skill by ID",
    description: "Retrieve a job seeker skill using its unique identifier.",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker skill with the given id.",
  })
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobSeekerSkillsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update a job seeker skill",
    description:
      "Update an existing job seeker skill using its unique identifier.",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker skill has been successfully updated.",
  })
  @UseGuards(new SelfGuard("id", "id"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobSeekerSkillDto: UpdateJobSeekerSkillDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "jobseeker" || user.role === "admin"||user.role === "superadmin") {
      return this.jobSeekerSkillsService.update(+id, updateJobSeekerSkillDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Delete job seeker skills",
    description: "Delete a job seeker skill using its unique identifier.",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker skill has been successfully deleted.",
  })
  @UseGuards(new SelfGuard("id", "id"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "jobseeker" || user.role === "admin"||user.role === "superadmin") {
      return this.jobSeekerSkillsService.remove(+id);
    }
    throw new ForbiddenException("Access denied");
  }
}
