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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreateJobPostingDto } from "./dto/create-job-posting.dto";
import { UpdateJobPostingDto } from "./dto/update-job-posting.dto";
import { JobPostingsService } from "./job-postings.service";

@ApiTags("Job Postings")
@Controller("job-postings")
export class JobPostingsController {
  constructor(private readonly jobPostingsService: JobPostingsService) {}

  @ApiOperation({ summary: "Create a new job posting", description: "" })
  @ApiResponse({ status: 201, description: "Job posting created successfully" })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobPostings"))
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createJobPostingDto: CreateJobPostingDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "employer"||user.role === "superadmin") {
      return this.jobPostingsService.create(createJobPostingDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({ summary: "Get a list of all job postings" })
  @ApiResponse({ status: 200, description: "List of job postings retrieved" })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.jobPostingsService.findAll();
  }
  @ApiOperation({ summary: "Get a list of all job postings by pagination" })
  @ApiResponse({ status: 200, description: "List of job postings retrieved" })
  @UseGuards(AuthGuard)
  @Get("pagination")
  findAllByPagination(
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
  ) {
    return this.jobPostingsService.findAllByPagination(+page, +limit);
  }

  @UseGuards(AuthGuard)
  @Get("get/employer/:id")
  @ApiOperation({ summary: "Find job postings by employer ID" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByEmployerId(@Param("id") id: number) {
    return this.jobPostingsService.findByEmployerId(+id);
  }

  @Get("get/category/:id")
  @ApiOperation({ summary: "Find job postings by category ID" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByCategoryId(@Param("id") id: number) {
    return this.jobPostingsService.findByCategoryId(+id);
  }

  @Get("get/job-company/:id")
  @ApiOperation({ summary: "Find job postings by company ID" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByCompanyId(@Param("id") id: number) {
    return this.jobPostingsService.findByCompanyId(+id);
  }

  @Get("get/job-requirements/:text")
  @ApiOperation({ summary: "Find job postings by requirements text" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByRequirements(@Param("text") text: string) {
    return this.jobPostingsService.findByRequirements(text);
  }

  @Get("get/required-skills/:text")
  @ApiOperation({ summary: "Find job postings by required skills" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByRequiredSkills(@Param("text") text: string) {
    return this.jobPostingsService.findByRequiredSkills(text);
  }

  @Get("get/job-type/:type")
  @ApiOperation({ summary: "Find job postings by job type" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByJobType(@Param("type") type: string) {
    return this.jobPostingsService.findByJobType(type);
  }

  @Get("get/work-location/:type")
  @ApiOperation({ summary: "Find job postings by work location type" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByWorkLocation(@Param("type") type: string) {
    return this.jobPostingsService.findByWorkLocation(type);
  }

  @Get("get/location/:loc")
  @ApiOperation({ summary: "Find job postings by location" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByLocation(@Param("loc") loc: string) {
    return this.jobPostingsService.findByLocation(loc);
  }

  @Get("get/salary-min/:value")
  @ApiOperation({
    summary:
      "Find job postings with minimum salary greater than or equal to value",
  })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findBySalaryMin(@Param("value") value: number) {
    return this.jobPostingsService.findBySalaryMin(+value);
  }

  @Get("get/salary-max/:value")
  @ApiOperation({
    summary:
      "Find job postings with maximum salary less than or equal to value",
  })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findBySalaryMax(@Param("value") value: number) {
    return this.jobPostingsService.findBySalaryMax(+value);
  }

  @Get("get/salary-period/:period")
  @ApiOperation({ summary: "Find job postings by salary period" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findBySalaryPeriod(@Param("period") period: string) {
    return this.jobPostingsService.findBySalaryPeriod(period);
  }

  @Get("get/experience-level/:level")
  @ApiOperation({ summary: "Find job postings by experience level" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByExperienceLevel(@Param("level") level: string) {
    return this.jobPostingsService.findByExperienceLevel(level);
  }

  @Get("get/education-level/:level")
  @ApiOperation({ summary: "Find job postings by education level" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByEducationLevel(@Param("level") level: string) {
    return this.jobPostingsService.findByEducationLevel(level);
  }

  @Get("get/status/:status")
  @ApiOperation({ summary: "Find job postings by status" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByStatus(@Param("status") status: string) {
    return this.jobPostingsService.findByStatus(status);
  }

  @Get("get/published-at/:date")
  @ApiOperation({ summary: "Find job postings by published date" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByPublishedAt(@Param("date") date: string) {
    return this.jobPostingsService.findByPublishedAt(new Date(date));
  }

  @Get("user-mark/:mark")
  @ApiOperation({ summary: "Find job postings by user mark" })
  @ApiResponse({
    status: 200,
    description: "Job postings found",
    schema: {
      example: {
        success: true,
        message: "Job postings found",
        data: [
          /* JobPosting */
        ],
      },
    },
  })
  @UseGuards(AuthGuard)
  findByUserMark(@Param("mark") mark: number) {
    return this.jobPostingsService.findByUserMark(+mark);
  }

  @ApiOperation({
    summary: "Search job postings with various filters",
    description: "Search job postings based on multiple criteria.",
  })
  @ApiResponse({
    status: 200,
    description: "List of job postings matching the search criteria",
  })
  @UseGuards(AuthGuard)
  @Get("search")
  async searchJobPostings(
    @Query("search") search?: string,
    @Query("category-id") categoryId?: string,
    @Query("job-type") jobType?: string,
    @Query("location") location?: string,
    @Query("salary-min") salaryMin?: string,
    @Query("salary-max") salaryMax?: string,
    @Query("experience-level") experienceLevel?: string,
    @Query("education-level") educationLevel?: string,
    @Query("status") status?: string,
    @Query("published-at-from") publishedAtFrom?: string,
    @Query("published-at-to") publishedAtTo?: string,
    @Query("application-deadline-after") applicationDeadlineAfter?: string,
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
  ) {
    const filters = {
      search,
      categoryId: categoryId ? +categoryId : undefined,
      jobType: jobType ? +jobType : undefined,
      location,
      salaryMin: salaryMin ? +salaryMin : undefined,
      salaryMax: salaryMax ? +salaryMax : undefined,
      experienceLevel: experienceLevel ? +experienceLevel : undefined,
      educationLevel: educationLevel ? +educationLevel : undefined,
      status: status,
      publishedAtFrom,
      publishedAtTo,
      applicationDeadlineAfter,
      page: +page,
      limit: +limit,
    };
    return this.jobPostingsService.searchJobPostings(filters);
  }

  @ApiOperation({ summary: "Apply for a job posting" })
  @ApiResponse({ status: 200, description: "Job application submitted" })
  @UseGuards(AuthGuard)
  @Post(":id/apply")
  async applyForJob(
    @Param("id") id: string,
    @Body() body: { userData?: string },
  ) {
    return await this.jobPostingsService.applyForJob(+id, body.userData);
  }

  @ApiOperation({
    summary: "Get popular job postings",
    description: "Retrieve popular job postings based on view count.",
  })
  @ApiResponse({
    status: 200,
    description: "List of popular job postings retrieved",
  })
  @UseGuards(AuthGuard)
  @Get("popular")
  async getPopularJobs(
    @Query("limit") limit: string = "10",
    @Query("page") page: string = "1",
    @Query("sort-by") sortBy: string = "viewCount",
    @Query("order") order: string = "desc",
  ) {
    console.log(limit, page, sortBy, order);
    sortBy === "view"
      ? (sortBy = "viewCount")
      : sortBy === "application"
        ? (sortBy = "applicationCount")
        : sortBy === "mark"
          ? (sortBy = "userMark")
          : (sortBy = "viewCount");
    return this.jobPostingsService.getPopularJobs(+limit, +page, sortBy, order);
  }

  @ApiOperation({ summary: "Update user mark for a job posting" })
  @ApiResponse({
    status: 200,
    description: "User mark updated successfully",
  })
  @UseGuards(AuthGuard)
  @Post(":id/mark")
  updateUserMark(@Param("id") id: string, @Body() body: { mark: number }) {
    return this.jobPostingsService.markJob(+id, body.mark);
  }

  @ApiOperation({ summary: "Update view count for a job posting" })
  @ApiResponse({
    status: 200,
    description: "View count updated successfully",
  })
  @UseGuards(AuthGuard)
  @Post(":id/view")
  updateViewCount(@Param("id") id: string) {
    return this.jobPostingsService.viewJob(+id);
  }

  @ApiOperation({ summary: "Get a job posting by ID" })
  @ApiResponse({ status: 200, description: "Job posting found" })
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobPostingsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a job posting by ID" })
  @ApiResponse({ status: 200, description: "Job posting updated successfully" })
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobPostingDto: UpdateJobPostingDto,
  ) {
    return this.jobPostingsService.update(+id, updateJobPostingDto);
  }

  @ApiOperation({ summary: "Delete a job posting by ID" })
  @ApiResponse({ status: 200, description: "Job posting deleted successfully" })
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobPostingsService.remove(+id);
  }
}
