import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateJobCategoryDto } from "./dto/create-job_category.dto";
import { UpdateJobCategoryDto } from "./dto/update-job_category.dto";
import { JobCategoryService } from "./job-category.service";
import { JobCategory } from "./entities/job_category.entity";

@ApiTags("Job Category")
@Controller("job-category")
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  @ApiOperation({ summary: "Create a new job category" })
  @ApiResponse({
    status: 201,
    description: "Job category successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid input data." })
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryService.create(createJobCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all job categories" })
  @ApiResponse({
    status: 200,
    description: "List of job categories returned successfully.",
  })
  findAll() {
    return this.jobCategoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a job category by ID" })
  @ApiResponse({ status: 200, description: "Job category found." })
  @ApiResponse({ status: 404, description: "Job category not found." })
  findOne(@Param("id") id: string) {
    return this.jobCategoryService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a job category by ID" })
  @ApiResponse({
    status: 200,
    description: "Job category updated successfully.",
  })
  @ApiResponse({ status: 400, description: "Invalid update data." })
  @ApiResponse({ status: 404, description: "Job category not found." })
  update(
    @Param("id") id: string,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoryService.update(+id, updateJobCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a job category by ID" })
  @ApiResponse({
    status: 204,
    description: "Job category deleted successfully.",
  })
  @ApiResponse({ status: 404, description: "Job category not found." })
  remove(@Param("id") id: string) {
    return this.jobCategoryService.remove(+id);
  }

  // Get by name
  @ApiOperation({
    summary: "Get all job categories by name",
    description:
      "This endpoint retrieves all job categories matching the given name (case-insensitive).",
  })
  @ApiResponse({
    status: 200,
    description: "Job categories retrieved successfully by name.",
    type: [JobCategory],
  })
  @ApiParam({ name: "name", example: "Software Development" })
  @Get("job-category-name/:name")
  async findAllByName(@Param("name") name: string) {
    return this.jobCategoryService.findAllByName(name);
  }

  // Get by isActive
  @ApiOperation({
    summary: "Get all job categories by active status",
    description:
      "This endpoint retrieves all job categories filtered by active/inactive status.",
  })
  @ApiResponse({
    status: 200,
    description: "Job categories retrieved successfully by active status.",
    type: [JobCategory],
  })
  @ApiParam({ name: "isActive", example: true })
  @Get("job-category-active/:isActive")
  async findAllByIsActive(@Param("isActive") isActive: string) {
    const activeBool = isActive === "true";
    return this.jobCategoryService.findAllByIsActive(activeBool);
  }
}
