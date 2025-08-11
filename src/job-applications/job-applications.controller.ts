import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateJobApplicationDto } from "./dto/create-job-application.dto";
import { UpdateJobApplicationDto } from "./dto/update-job-application.dto";
import { JobApplicationsService } from "./job-applications.service";

@Controller("job-applications")
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
  ) {}

  @ApiOperation({
    summary: "Create a new job application",
    description: "This endpoint allows you to create a new job application.",
  })
  @ApiResponse({
    status: 201,
    description: "Job application created successfully.",
  })
  @Post()
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(createJobApplicationDto);
  }

  @ApiOperation({
    summary: "Get all job applications",
    description: "This endpoint retrieves all job applications.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully.",
  })
  @Get()
  findAll() {
    return this.jobApplicationsService.findAll();
  }

  @ApiOperation({
    summary: "Get a job application by ID",
    description: "This endpoint retrieves a job application by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Job application retrieved successfully.",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobApplicationsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update a job application",
    description:
      "This endpoint allows you to update a job application by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Job application updated successfully.",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationsService.update(+id, updateJobApplicationDto);
  }

  @ApiOperation({
    summary: "Delete a job application",
    description:
      "This endpoint allows you to delete a job application by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Job application deleted successfully.",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobApplicationsService.remove(+id);
  }

  @ApiOperation({
    summary: "Get all job applications by job seeker ID",
    description:
      "This endpoint retrieves all job applications for a specific job seeker.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully for job seeker.",
  })
  @Get("job-seeker/:jobSeekerId")
  findAllApplicationsByJobSeekerId(@Param("jobSeekerId") jobSeekerId: string) {
    return this.jobApplicationsService.findAllAplicationsByJobSeekerId(
      +jobSeekerId,
    );
  }

  @ApiOperation({
    summary: "Get all job applications by job seeker ID and status",
    description:
      "This endpoint retrieves all job applications for a specific job seeker and status.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully for job seeker and status.",
  })  
  @Get("job-seeker/:jobSeekerId/status/:status")
  findAllApplicationsByJobSeekerIdAndStatus(
    @Param("jobSeekerId") jobSeekerId: string,
    @Param("status") status: string,
  ) {
    return this.jobApplicationsService.findAllApplicationsByJobSeekerIdAndStatus(
      +jobSeekerId,
      status,
    );
  }

  @ApiOperation({
    summary: "Get all job applications by job posting ID",
    description:
      "This endpoint retrieves all job applications for a specific job posting.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully for job posting.",
  })
  @Get("job-posting/:jobPostingId")
  findAllApplicationsByJobPostingId(@Param("jobPostingId") jobPostingId: string) {
    return this.jobApplicationsService.findAllApplicationsByJobPostingId(
      +jobPostingId,
    );
  }

  @ApiOperation({
    summary: "Get all job applications by job posting ID and status",
    description:
      "This endpoint retrieves all job applications for a specific job posting and status.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully for job posting and status.", 
  })
  
  @Get("job-posting/:jobPostingId/status/:status")
  findAllApplicationsByJobPostingIdAndStatus(
    @Param("jobPostingId") jobPostingId: string,
    @Param("status") status: string,
  ) {
    return this.jobApplicationsService.findAllApplicationsByJobPostingIdAndStatus(
      +jobPostingId,
      status,
    );
  }

  @ApiOperation({
    summary: "Get all job applications by job seeker ID and job posting ID",
    description:
      "This endpoint retrieves all job applications for a specific job seeker and job posting.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully for job seeker and job posting.",
  })
  @Get("job-seeker/:jobSeekerId/job-posting/:jobPostingId")
  findAllApplicationsByJobSeekerIdAndJobPostingId(
    @Param("jobSeekerId") jobSeekerId: string,
    @Param("jobPostingId") jobPostingId: string,
  ) {
    return this.jobApplicationsService.findAllApplicationsByJobPostingIdAndJobSeekerId(
      +jobSeekerId,
      +jobPostingId,
    );
  }

  @ApiOperation({
    summary: "Get all job applications by job postings category ID and job seeker ID",
    description:
      "This endpoint retrieves all job applications for a specific job postings category and job seeker.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully for job postings category and job seeker.",
  })
  @Get("job-postings-category/:jobPostingsCategoryId/job-seeker/:jobSeekerId")
  findAllApllicationsByJobPostingsCategoryId(
    jobPostingsCategoryId: number,
    jobSeekerId: number,
  ) {
    return this.jobApplicationsService.findAllApllicationsByJobPostingsCategoryId(
      jobPostingsCategoryId,
      jobSeekerId,
    );
  }
	
}
