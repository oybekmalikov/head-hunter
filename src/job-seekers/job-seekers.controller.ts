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
import { CreateJobSeekerDto } from "./dto/create-job-seeker.dto";
import { UpdateJobSeekerDto } from "./dto/update-job-seeker.dto";
import { JobSeekersService } from "./job-seekers.service";

@Controller("job-seekers")
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersService) {}

  @ApiOperation({
    summary: "Create job seeker",
    description: "Create job seeker",
  })
  @ApiResponse({
    status: 201,
    description: "The job seeker has been successfully created.",
  })
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
  @Get()
  findAll() {
    return this.jobSeekersService.findAll();
  }

  @ApiOperation({
    summary: "Get job seeker by id",
    description: "Get job seeker by id",
  })
  @ApiResponse({
    status: 200,
    description: "Return job seeker by id",
  })
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
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobSeekerDto: UpdateJobSeekerDto,
  ) {
    return this.jobSeekersService.update(+id, updateJobSeekerDto);
  }

  @ApiOperation({
    summary: "Delete job seeker",
    description: "Delete job seeker",
  })
  @ApiResponse({
    status: 200,
    description: "The job seeker has been successfully deleted.",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobSeekersService.remove(+id);
  }
}
