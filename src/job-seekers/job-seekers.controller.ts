import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  ForbiddenException,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ResumeUploadService } from "src/common/services/resume-upload.service";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreateJobSeekerDto } from "./dto/create-job-seeker.dto";
import { UpdateJobSeekerDto } from "./dto/update-job-seeker.dto";
import { UploadResumeDto } from "./dto/upload-resume.dto";
import { JobSeekersService } from "./job-seekers.service";

@Controller("job-seekers")
export class JobSeekersController {
  constructor(
    private readonly jobSeekersService: JobSeekersService,
    private readonly resumeUploadService: ResumeUploadService,
  ) {}

  @ApiOperation({
    summary: "Get job seeker profile",
    description: "Get job seeker profile by id",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker profile was successfully received.",
  })
  @UseGuards(AuthGuard)
  @Get("profile")
  userProfile(@Req() req: Request) {
    const user = (req as any).user;
    return this.jobSeekersService.userProfile(user.id);
  }

  @ApiOperation({
    summary: "Create job seeker",
    description: "Create job seeker",
  })
  @ApiResponse({
    status: 201,
    description: "The job seeker has been successfully created.",
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createJobSeekerDto: CreateJobSeekerDto) {
    return this.jobSeekersService.create(createJobSeekerDto);
  }

  @ApiOperation({
    summary: "Get all job seekers",
    description: "Get all job seekers",
  })
  @ApiResponse({
    status: 200,
    description: "Return all job seekers",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobSeeker"))
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobSeekersService.findAll();
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all job seekers by pagination",
    description: "Get all job seekers by pagination",
  })
  @ApiResponse({
    status: 200,
    description: "Return all job seekers by pagination",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobSeeker"))
  @UseGuards(AuthGuard)
  @Get("pagination")
  findAllByPagination(
    @Query("page") page: number,
    @Query("limit") limit: number,
  ) {
    return this.jobSeekersService.findAllByPagination(page, limit);
  }

  @ApiOperation({
    summary: "Get job seeker by id",
    description: "Get job seeker by id",
  })
  @ApiResponse({
    status: 200,
    description: "Return job seeker by id",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobSeeker"))
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobSeekersService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update job seeker",
    description: "Update job seeker",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker has been successfully updated.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobSeeker"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobSeekerDto: UpdateJobSeekerDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "jobseeker" || user.role === "superadmin") {
      return this.jobSeekersService.update(+id, updateJobSeekerDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Delete job seeker",
    description: "Delete job seeker",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker has been successfully deleted.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "jobSeeker"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.jobSeekersService.remove(+id);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Upload resume",
    description: "Upload resume file for job seeker",
  })
  @ApiResponse({
    status: 200,
    description: "Resume uploaded successfully",
  })
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard)
  @Post("upload-resume")
  @UseInterceptors(FileInterceptor("file"))
  async uploadResume(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: ".(pdf|doc|docx)" }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadResumeDto: UploadResumeDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role !== "jobseeker") {
      throw new ForbiddenException("Only job seekers can upload resumes");
    }

    return this.jobSeekersService.uploadResume(
      user.id,
      file,
      uploadResumeDto.description,
    );
  }

  @ApiOperation({
    summary: "Delete resume",
    description: "Delete resume file for job seeker",
  })
  @ApiResponse({
    status: 200,
    description: "Resume deleted successfully",
  })
  @UseGuards(AuthGuard)
  @Delete("delete-resume")
  async deleteResume(@Req() req: Request) {
    const user = (req as any).user;
    if (user.role !== "jobseeker") {
      throw new ForbiddenException("Only job seekers can delete resumes");
    }

    return this.jobSeekersService.deleteResume(user.id);
  }
}
