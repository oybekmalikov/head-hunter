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
import { CreateSavedJobDto } from "./dto/create-saved-job.dto";
import { UpdateSavedJobDto } from "./dto/update-saved-job.dto";
import { SavedJobsService } from "./saved-jobs.service";

@Controller("saved-jobs")
export class SavedJobsController {
  constructor(private readonly savedJobsService: SavedJobsService) {}

  @ApiOperation({
    summary: "Create a new saved job",
    description:
      "This endpoint allows a job seeker to save a job posting for later reference.",
  })
  @ApiResponse({
    status: 201,
    description: "The saved job has been successfully created.",
  })
  @Post()
  create(@Body() createSavedJobDto: CreateSavedJobDto) {
    return this.savedJobsService.create(createSavedJobDto);
  }

  @ApiOperation({
    summary: "Retrieve all saved jobs",
    description:
      "This endpoint returns a list of all saved jobs for the job seeker.",
  })
  @ApiResponse({
    status: 200,
    description: "A list of saved jobs has been successfully retrieved.",
  })
  @Get()
  findAll() {
    return this.savedJobsService.findAll();
  }

  @ApiOperation({
    summary: "Retrieve a saved job by ID",
    description:
      "This endpoint returns a specific saved job based on the provided ID.",
  })
  @ApiResponse({
    status: 200,
    description: "The saved job has been successfully retrieved.",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.savedJobsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update a saved job",
    description:
      "This endpoint allows a job seeker to update the details of a saved job.",
  })
  @ApiResponse({
    status: 200,
    description: "The saved job has been successfully updated.",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSavedJobDto: UpdateSavedJobDto,
  ) {
    return this.savedJobsService.update(+id, updateSavedJobDto);
  }

  @ApiOperation({
    summary: "Delete a saved job",
    description:
      "This endpoint allows a job seeker to remove a saved job from their list.",
  })
  @ApiResponse({
    status: 200,
    description: "The saved job has been successfully deleted.",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.savedJobsService.remove(+id);
  }

  @ApiOperation({
    summary: "Get saved jobs by job seeker ID",
    description:
      "This endpoint retrieves all saved jobs for a specific job seeker based on their ID.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Saved jobs for the specified job seeker have been successfully retrieved.",
  })
  @Get("job-seeker/:jobSeekerId")
  findByJobSeekerId(@Param("jobSeekerId") jobSeekerId: string) {
    return this.savedJobsService.findByJobSeekerId(+jobSeekerId);
  }
}
