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
import { CreateJobsNotificationDto } from "./dto/create-jobs-notification.dto";
import { UpdateJobsNotificationDto } from "./dto/update-jobs-notification.dto";
import { JobsNotificationsService } from "./jobs-notifications.service";

@Controller("jobs-notifications")
export class JobsNotificationsController {
  constructor(
    private readonly jobsNotificationsService: JobsNotificationsService,
  ) {}

  @ApiOperation({
    summary: "Create a new job notification",
    description: "Creates a new job notification with the provided details.",
  })
  @ApiResponse({
    status: 201,
    description: "Job notification created successfully.",
  })
  @Post()
  create(@Body() createJobsNotificationDto: CreateJobsNotificationDto) {
    return this.jobsNotificationsService.create(createJobsNotificationDto);
  }

  @ApiOperation({
    summary: "Get all job notifications",
    description: "Retrieves a list of all job notifications.",
  })
  @ApiResponse({
    status: 200,
    description: "Job notifications retrieved successfully.",
  })
  @Get()
  findAll() {
    return this.jobsNotificationsService.findAll();
  }

  @ApiOperation({
    summary: "Get a job notification by ID",
    description: "Retrieves a specific job notification by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Job notification retrieved successfully.",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobsNotificationsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update a job notification",
    description:
      "Updates an existing job notification with the provided details.",
  })
  @ApiResponse({
    status: 200,
    description: "Job notification updated successfully.",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobsNotificationDto: UpdateJobsNotificationDto,
  ) {
    return this.jobsNotificationsService.update(+id, updateJobsNotificationDto);
  }

  @ApiOperation({
    summary: "Delete a job notification",
    description: "Deletes a specific job notification by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Job notification removed successfully.",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobsNotificationsService.remove(+id);
  }

  @ApiOperation({
    summary: "Get job notifications by job seeker ID",
    description:
      "Retrieves job notifications for a specific job seeker by their ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Job notifications for the job seeker retrieved successfully.",
  })
  @Get("job-seeker/:jobSeekerId")
  findByJobSeekerId(@Param("jobSeekerId") jobSeekerId: number) {
    return this.jobsNotificationsService.findByJobSeekerId(jobSeekerId);
  }
}
