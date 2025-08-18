import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { CreateJobApplicationDto } from "./dto/create-job-application.dto";
import { UpdateJobApplicationDto } from "./dto/update-job-application.dto";
import { JobApplicationsService } from "./job-applications.service";

@Controller("job-applications")
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
  ) {}

  @ApiOperation({
    summary: "Get all job applications by job seeker ID",
    description:
      "This endpoint retrieves all job applications for a specific job seeker.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully for job seeker.",
  })
  @UseGuards(new SelfGuard("jobSeekerId", "jobSeekerId"))
  @UseGuards(AuthGuard)
  @Get("job-seeker/:jobSeekerId")
  findAllApplicationsByJobSeekerId(@Param("jobSeekerId") jobSeekerId: string) {
    return this.jobApplicationsService.findAllAplicationsByJobSeekerId(
      +jobSeekerId,
    );
  }

  @ApiOperation({
    summary: "Get all job applications by job seeker ID and pagination",
    description:
      "This endpoint retrieves all job applications for a specific job seeker.",
  })
  @ApiResponse({
    status: 200,
    description: "Job applications retrieved successfully for job seeker.",
  })
  @UseGuards(new SelfGuard("jobSeekerId", "jobSeekerId"))
  @UseGuards(AuthGuard)
  @Get("job-seeker/:jobSeekerId/pagination")
  findAllApplicationsByJobSeekerIdAndPagination(
    @Param("jobSeekerId") jobSeekerId: string,
    @Query("page") page: string,
    @Query("limit") limit: string,
  ) {
    return this.jobApplicationsService.findAllAplicationsByJobSeekerIdAndPagination(
      +jobSeekerId,
      +page,
      +limit,
    );
  }

  @ApiOperation({
    summary: "Get all job applications by job seeker ID and status",
    description:
      "This endpoint retrieves all job applications for a specific job seeker and status.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Job applications retrieved successfully for job seeker and status.",
  })
  @UseGuards(new SelfGuard("jobSeekerId", "jobSeekerId"))
  @UseGuards(AuthGuard)
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
  @UseGuards(new SelfGuard("jobPostingId", "jobPostingId"))
  @UseGuards(AuthGuard)
  @Get("job-posting/:jobPostingId")
  findAllApplicationsByJobPostingId(
    @Param("jobPostingId") jobPostingId: string,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobApplicationsService.findAllApplicationsByJobPostingId(
        +jobPostingId,
      );
    } else if (user.role === "employer") {
      return this.jobApplicationsService.findAllApplicationsByJobPostingId(
        +jobPostingId,
        user.employerId,
        user.role,
      );
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all job applications by job posting ID and status",
    description:
      "This endpoint retrieves all job applications for a specific job posting and status.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Job applications retrieved successfully for job posting and status.",
  })
  @UseGuards(AuthGuard)
  @Get("job-posting/:jobPostingId/status/:status")
  findAllApplicationsByJobPostingIdAndStatus(
    @Param("jobPostingId") jobPostingId: string,
    @Param("status") status: string,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobApplicationsService.findAllApplicationsByJobPostingIdAndStatus(
        +jobPostingId,
        status,
      );
    } else if (user.role === "employer") {
      return this.jobApplicationsService.findAllApplicationsByJobPostingIdAndStatus(
        +jobPostingId,
        status,
        user.id,
        user.role,
      );
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all job applications by job seeker ID and job posting ID",
    description:
      "This endpoint retrieves all job applications for a specific job seeker and job posting.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Job applications retrieved successfully for job seeker and job posting.",
  })
  @UseGuards(new SelfGuard("jobSeekerId", "jobSeekerId"))
  @UseGuards(AuthGuard)
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
    summary:
      "Get all job applications by job postings category ID and job seeker ID",
    description:
      "This endpoint retrieves all job applications for a specific job postings category and job seeker.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Job applications retrieved successfully for job postings category and job seeker.",
  })
  @UseGuards(new SelfGuard("jobSeekerId", "jobSeekerId"))
  @UseGuards(AuthGuard)
  @Get("job-postings-category/:jobPostingsCategoryId/job-seeker/:jobSeekerId")
  findAllApllicationsByJobPostingsCategoryId(
    @Param("jobPostingsCategoryId") jobPostingsCategoryId: string,
    @Param("jobSeekerId") jobSeekerId: string,
  ) {
    return this.jobApplicationsService.findAllApllicationsByJobPostingsCategoryId(
      +jobPostingsCategoryId,
      +jobSeekerId,
    );
  }
  @ApiOperation({
    summary: "Create a new job application",
    description: "This endpoint allows you to create a new job application.",
  })
  @ApiResponse({
    status: 201,
    description: "Job application created successfully.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobApplication"))
  @UseGuards(AuthGuard)
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
  @UseGuards(new AccessControlGuard(accessMatrix, "jobApplication"))
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobApplicationsService.findAll();
    } else if (user.role === "employer") {
      return this.jobApplicationsService.findAllApplicationsByEmployerId(
        user.employerId,
      );
    } else if (user.role === "jobseeker") {
      return this.jobApplicationsService.findAllAplicationsByJobSeekerId(
        user.jobSeekerId,
      );
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get a job application by ID",
    description: "This endpoint retrieves a job application by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Job application retrieved successfully.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobApplication"))
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobApplicationsService.findOne(+id);
    } else if (user.role === "employer") {
      return this.jobApplicationsService.findOne(+id, user.employerId, user.role);
    } else if (user.role === "jobseeker") {
      return this.jobApplicationsService.findOne(+id, user.jobSeekerId, user.role);
    }
    throw new ForbiddenException("Access denied");
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
  @UseGuards(new AccessControlGuard(accessMatrix, "jobApplication"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobApplicationsService.update(+id, updateJobApplicationDto);
    }
    throw new ForbiddenException("Access denied");
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
  @UseGuards(new AccessControlGuard(accessMatrix, "jobApplication"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobApplicationsService.remove(+id);
    }
    throw new ForbiddenException("Access denied");
  }
}
