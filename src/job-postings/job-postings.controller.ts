import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { JobPostingsService } from "./job-postings.service";
import { CreateJobPostingDto } from "./dto/create-job-posting.dto";
import { UpdateJobPostingDto } from "./dto/update-job-posting.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

@ApiTags("Job Postings")
@Controller("job-postings")
export class JobPostingsController {
  constructor(private readonly jobPostingsService: JobPostingsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new job posting", description: "" })
  @ApiResponse({ status: 201, description: "Job posting created successfully" })
  @ApiBadRequestResponse({
    description: "Validation failed. Check your request body.",
  })
  create(@Body() createJobPostingDto: CreateJobPostingDto) {
    return this.jobPostingsService.create(createJobPostingDto);
  }

  @Get()
  @ApiOperation({ summary: "Get a list of all job postings" })
  @ApiResponse({ status: 200, description: "List of job postings retrieved" })
  findAll() {
    return this.jobPostingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a job posting by ID" })
  @ApiParam({ name: "id", description: "ID of the job posting" })
  @ApiResponse({ status: 200, description: "Job posting found" })
  @ApiNotFoundResponse({ description: "Job posting not found" })
  @ApiBadRequestResponse({ description: "Invalid ID parameter" })
  findOne(@Param("id") id: string) {
    return this.jobPostingsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a job posting by ID" })
  @ApiParam({ name: "id", description: "ID of the job posting to update" })
  @ApiResponse({ status: 200, description: "Job posting updated successfully" })
  @ApiNotFoundResponse({ description: "Job posting not found" })
  @ApiBadRequestResponse({ description: "Invalid update data or ID" })
  update(
    @Param("id") id: string,
    @Body() updateJobPostingDto: UpdateJobPostingDto,
  ) {
    return this.jobPostingsService.update(+id, updateJobPostingDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a job posting by ID" })
  @ApiParam({ name: "id", description: "ID of the job posting to delete" })
  @ApiResponse({ status: 200, description: "Job posting deleted successfully" })
  @ApiNotFoundResponse({ description: "Job posting not found" })
  @ApiBadRequestResponse({ description: "Invalid ID parameter" })
  remove(@Param("id") id: string) {
    return this.jobPostingsService.remove(+id);
  }

  @Get("job-posting-employer/:id")
  @ApiOperation({ summary: "Find job postings by employer ID" })
  @ApiParam({ name: "id", example: 1, description: "Employer ID" })
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
  @ApiResponse({
    status: 404,
    description: "No job postings found for this employer",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByEmployerId(@Param("id") id: number) {
    return this.jobPostingsService.findByEmployerId(+id);
  }

  @Get("job-posting-category/:id")
  @ApiOperation({ summary: "Find job postings by category ID" })
  @ApiParam({ name: "id", example: 2, description: "Category ID" })
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
  @ApiResponse({
    status: 404,
    description: "No job postings found for this category",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByCategoryId(@Param("id") id: number) {
    return this.jobPostingsService.findByCategoryId(+id);
  }

  @Get("job-posting-company/:id")
  @ApiOperation({ summary: "Find job postings by company ID" })
  @ApiParam({ name: "id", example: 3, description: "Company ID" })
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
  @ApiResponse({
    status: 404,
    description: "No job postings found for this company",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByCompanyId(@Param("id") id: number) {
    return this.jobPostingsService.findByCompanyId(+id);
  }

  @Get("job-posting-requirements/:text")
  @ApiOperation({ summary: "Find job postings by requirements text" })
  @ApiParam({
    name: "text",
    example: "React",
    description: "Requirements text",
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
  @ApiResponse({
    status: 404,
    description: "No job postings match the given requirements",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByRequirements(@Param("text") text: string) {
    return this.jobPostingsService.findByRequirements(text);
  }

  @Get("job-posting-skills/:text")
  @ApiOperation({ summary: "Find job postings by required skills" })
  @ApiParam({ name: "text", example: "JavaScript", description: "Skill text" })
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
  @ApiResponse({
    status: 404,
    description: "No job postings match the given skills",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByRequiredSkills(@Param("text") text: string) {
    return this.jobPostingsService.findByRequiredSkills(text);
  }

  @Get("job-posting-type/:type")
  @ApiOperation({ summary: "Find job postings by job type" })
  @ApiParam({ name: "type", example: "full-time", description: "Job type" })
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
  @ApiResponse({
    status: 404,
    description: "No job postings match the given job type",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByJobType(@Param("type") type: string) {
    return this.jobPostingsService.findByJobType(type);
  }

  @Get("job-posting-work-location/:type")
  @ApiOperation({ summary: "Find job postings by work location type" })
  @ApiParam({
    name: "type",
    example: "remote",
    description: "Work location type",
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
  @ApiResponse({
    status: 404,
    description: "No job postings match the given work location type",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByWorkLocation(@Param("type") type: string) {
    return this.jobPostingsService.findByWorkLocation(type);
  }

  @Get("job-posting-location/:loc")
  @ApiOperation({ summary: "Find job postings by location" })
  @ApiParam({ name: "loc", example: "Tashkent", description: "Job location" })
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
  @ApiResponse({
    status: 404,
    description: "No job postings found in this location",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByLocation(@Param("loc") loc: string) {
    return this.jobPostingsService.findByLocation(loc);
  }

  @Get("job-posting-salary-min/:value")
  @ApiOperation({
    summary:
      "Find job postings with minimum salary greater than or equal to value",
  })
  @ApiParam({
    name: "value",
    example: 50000,
    description: "Minimum salary value",
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
  @ApiResponse({
    status: 404,
    description: "No job postings match the given minimum salary",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findBySalaryMin(@Param("value") value: number) {
    return this.jobPostingsService.findBySalaryMin(+value);
  }

  @Get("job-posting-salary-max/:value")
  @ApiOperation({
    summary:
      "Find job postings with maximum salary less than or equal to value",
  })
  @ApiParam({
    name: "value",
    example: 80000,
    description: "Maximum salary value",
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
  @ApiResponse({
    status: 404,
    description: "No job postings match the given maximum salary",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findBySalaryMax(@Param("value") value: number) {
    return this.jobPostingsService.findBySalaryMax(+value);
  }

  @Get("job-posting-salary-period/:period")
  @ApiOperation({ summary: "Find job postings by salary period" })
  @ApiParam({
    name: "period",
    example: "monthly",
    description: "Salary period",
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
  @ApiResponse({
    status: 404,
    description: "No job postings found for this salary period",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findBySalaryPeriod(@Param("period") period: string) {
    return this.jobPostingsService.findBySalaryPeriod(period);
  }

  @Get("job-posting-experience-level/:level")
  @ApiOperation({ summary: "Find job postings by experience level" })
  @ApiParam({
    name: "level",
    example: "senior",
    description: "Experience level",
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
  @ApiResponse({
    status: 404,
    description: "No job postings found for this experience level",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByExperienceLevel(@Param("level") level: string) {
    return this.jobPostingsService.findByExperienceLevel(level);
  }

  @Get("job-posting-education-level/:level")
  @ApiOperation({ summary: "Find job postings by education level" })
  @ApiParam({
    name: "level",
    example: "bachelor",
    description: "Education level",
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
  @ApiResponse({
    status: 404,
    description: "No job postings found for this education level",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByEducationLevel(@Param("level") level: string) {
    return this.jobPostingsService.findByEducationLevel(level);
  }

  @Get("job-posting-status/:status")
  @ApiOperation({ summary: "Find job postings by status" })
  @ApiParam({
    name: "status",
    example: "active",
    description: "Job posting status",
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
  @ApiResponse({
    status: 404,
    description: "No job postings found with this status",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByStatus(@Param("status") status: string) {
    return this.jobPostingsService.findByStatus(status);
  }

  @Get("job-posting-published-at/:date")
  @ApiOperation({ summary: "Find job postings by published date" })
  @ApiParam({
    name: "date",
    example: "2024-01-15",
    description: "Published date (YYYY-MM-DD)",
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
  @ApiResponse({
    status: 404,
    description: "No job postings found for this published date",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByPublishedAt(@Param("date") date: string) {
    return this.jobPostingsService.findByPublishedAt(new Date(date));
  }

  @Get("job-posting-user-mark/:mark")
  @ApiOperation({ summary: "Find job postings by user mark" })
  @ApiParam({ name: "mark", example: 4.5, description: "User rating mark" })
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
  @ApiResponse({
    status: 404,
    description: "No job postings found with this user mark",
    schema: {
      example: { success: false, message: "No job postings found", data: [] },
    },
  })
  findByUserMark(@Param("mark") mark: number) {
    return this.jobPostingsService.findByUserMark(+mark);
  }
}
