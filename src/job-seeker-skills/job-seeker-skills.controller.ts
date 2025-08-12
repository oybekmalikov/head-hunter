import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { CreateJobSeekerSkillDto } from "./dto/create-job-seeker-skill.dto";
import { UpdateJobSeekerSkillDto } from "./dto/update-job-seeker-skill.dto";
import { JobSeekerSkillsService } from "./job-seeker-skills.service";

@Controller("job-seeker-skills")
export class JobSeekerSkillsController {
  constructor(
    private readonly jobSeekerSkillsService: JobSeekerSkillsService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new job seeker skill", description: "Create a new job seeker skill" })
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  create(@Body() createJobSeekerSkillDto: CreateJobSeekerSkillDto) {
    return this.jobSeekerSkillsService.create(createJobSeekerSkillDto);
  }

  @ApiOperation({summary:"Get all job seeker skills", description:"Get all job seeker skills"})
  @ApiResponse({
    status: 200,
    description: "The list of all job seeker skills.",
  })
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
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobSeekerSkillsService.findOne(+id);
  }

  @ApiOperation({
    summary:"Get all job seeker skills by job seeker id",
    description:"Get all job seeker skills by job seeker id",
  })
  @ApiResponse({
    status: 200,
    description: "The list of all job seeker skills.",
  })
  @Get("/job-seeker/:job_seeker_id")
  jobSeekerSkills(@Param("job_seeker_id") job_seeker_id: string) {
    return this.jobSeekerSkillsService.jobSeekerSkills(+job_seeker_id);
  }

  @ApiOperation({
    summary: "Update a job seeker skill",
    description: "Update an existing job seeker skill using its unique identifier.",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker skill has been successfully updated.",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobSeekerSkillDto: UpdateJobSeekerSkillDto,
  ) {
    return this.jobSeekerSkillsService.update(+id, updateJobSeekerSkillDto);
  }

  @ApiOperation({
    summary:"Delete job seeker skills",
    description:"Delete a job seeker skill using its unique identifier.",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker skill has been successfully deleted.",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobSeekerSkillsService.remove(+id);
  }
}
