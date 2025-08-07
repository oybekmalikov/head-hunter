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
import { CreateWorkExperienceDto } from "./dto/create-work-experience.dto";
import { UpdateWorkExperienceDto } from "./dto/update-work-experience.dto";
import { WorkExperienceService } from "./work-experience.service";

@Controller("work-experience")
export class WorkExperienceController {
	constructor(private readonly workExperienceService: WorkExperienceService) {}

	@ApiOperation({
		summary: "Create a new work experience",
		description:
			"This endpoint allows you to create a new work experience entry for a job seeker.",
	})
	@ApiResponse({
		status: 201,
		description: "The work experience has been successfully created.",
	})
	@Post()
	create(@Body() createWorkExperienceDto: CreateWorkExperienceDto) {
		return this.workExperienceService.create(createWorkExperienceDto);
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
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateWorkExperienceDto: UpdateWorkExperienceDto
	) {
		return this.workExperienceService.update(+id, updateWorkExperienceDto);
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
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.workExperienceService.remove(+id);
	}
}
