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
		private readonly jobApplicationsService: JobApplicationsService
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
		@Body() updateJobApplicationDto: UpdateJobApplicationDto
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
}
