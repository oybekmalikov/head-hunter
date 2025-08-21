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
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { CreateWorkExperienceDto } from "./dto/create-work-experience.dto";
import { UpdateWorkExperienceDto } from "./dto/update-work-experience.dto";
import { WorkExperienceService } from "./work-experience.service";

@Controller("work-experience")
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @ApiOperation({
    summary: "Get work experiences by job seeker ID",
    description:
      "This endpoint retrieves all work experiences associated with a specific job seeker ID.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Returns an array of work experiences for the specified job seeker.",
  })
  @UseGuards(AuthGuard)
  @Get("job-seeker/:jobSeekerId")
  findByJobSeekerId(@Param("jobSeekerId") jobSeekerId: string) {
    return this.workExperienceService.findByJobSeekerId(+jobSeekerId);
  }

  @ApiOperation({
    summary: "Create a new work experience",
    description:
      "This endpoint allows you to create a new work experience entry for a job seeker.",
  })
  @ApiResponse({
    status: 201,
    description: "The work experience has been successfully created.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "workExperience"))
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createWorkExperienceDto: CreateWorkExperienceDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "jobseeker" || user.role === "superadmin") {
      return this.workExperienceService.create(createWorkExperienceDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all work experiences",
    description:
      "This endpoint retrieves all work experiences for job seekers.",
  })
  @ApiResponse({
    status: 200,
    description: "Returns an array of work experiences.",
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.workExperienceService.findAll();
  }

  @ApiOperation({
    summary: "Get a work experience by ID",
    description:
      "This endpoint retrieves a specific work experience by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Returns the work experience with the specified ID.",
  })
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workExperienceService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update a work experience by ID",
    description:
      "This endpoint allows you to update an existing work experience by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "The work experience has been successfully updated.",
  })
  @UseGuards(new SelfGuard("id", "id"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "jobseeker" || user.role === "superadmin") {
      return this.workExperienceService.update(+id, updateWorkExperienceDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Delete a work experience by ID",
    description:
      "This endpoint allows you to delete a work experience by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "The work experience has been successfully deleted.",
  })
  @UseGuards(new SelfGuard("id", "id"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "jobseeker" || user.role === "superadmin") {
      return this.workExperienceService.remove(+id);
    }
    throw new ForbiddenException("Access denied");
  }
}
