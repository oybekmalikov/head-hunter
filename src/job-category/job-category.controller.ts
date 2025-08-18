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
import { CreateJobCategoryDto } from "./dto/create-job_category.dto";
import { UpdateJobCategoryDto } from "./dto/update-job_category.dto";
import { JobCategoryService } from "./job-category.service";

@ApiTags("Job Category")
@Controller("job-category")
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @ApiOperation({
    summary: "Get all job categories by name",
    description:
      "This endpoint retrieves all job categories matching the given name (case-insensitive).",
  })
  @ApiResponse({
    status: 200,
    description: "Job categories retrieved successfully by name.",
  })
  @UseGuards(AuthGuard)
  @Get("job-category-name/:name")
  async findAllByName(@Param("name") name: string) {
    return this.jobCategoryService.findAllByName(name);
  }

  @ApiOperation({
    summary: "Get all job categories by active status",
    description:
      "This endpoint retrieves all job categories filtered by active/inactive status.",
  })
  @ApiResponse({
    status: 200,
    description: "Job categories retrieved successfully by active status.",
  })
  @UseGuards(AuthGuard)
  @Get("job-category-active/:isActive")
  async findAllByIsActive(@Param("isActive") isActive: string) {
    const activeBool = isActive === "true";
    return this.jobCategoryService.findAllByIsActive(activeBool);
  }
  @Post()
  @ApiOperation({ summary: "Create a new job category" })
  @ApiResponse({
    status: 201,
    description: "Job category successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid input data." })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobCategory"))
  @UseGuards(AuthGuard)
  create(
    @Body() createJobCategoryDto: CreateJobCategoryDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobCategoryService.create(createJobCategoryDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({ summary: "Get all job categories" })
  @ApiResponse({
    status: 200,
    description: "List of job categories returned successfully.",
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.jobCategoryService.findAll();
  }

  @ApiOperation({
    summary: "Get all job categories with pagination",
    description: "This endpoint retrieves job categories with pagination.",
  })
  @ApiResponse({
    status: 200,
    description: "Job categories retrieved successfully with pagination.",
  })
  @UseGuards(AuthGuard)
  @Get("pagination")
  async findAllByPagination(
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
  ) {
    return this.jobCategoryService.findAllByPagination(+page, +limit);
  }

  @ApiOperation({ summary: "Get a job category by ID" })
  @ApiResponse({ status: 200, description: "Job category found." })
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobCategoryService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a job category by ID" })
  @ApiResponse({
    status: 200,
    description: "Job category updated successfully.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobCategory"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobCategoryService.update(+id, updateJobCategoryDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({ summary: "Delete a job category by ID" })
  @ApiResponse({
    status: 204,
    description: "Job category deleted successfully.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobCategory"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobCategoryService.remove(+id);
    }
    throw new ForbiddenException("Access denied");
  }
}
