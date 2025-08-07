import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Job Postings')
@Controller('job-postings')
export class JobPostingsController {
  constructor(private readonly jobPostingsService: JobPostingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({ status: 201, description: 'Job posting created successfully' })
  @ApiBadRequestResponse({
    description: 'Validation failed. Check your request body.',
  })
  create(@Body() createJobPostingDto: CreateJobPostingDto) {
    return this.jobPostingsService.create(createJobPostingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all job postings' })
  @ApiResponse({ status: 200, description: 'List of job postings retrieved' })
  findAll() {
    return this.jobPostingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job posting by ID' })
  @ApiParam({ name: 'id', description: 'ID of the job posting' })
  @ApiResponse({ status: 200, description: 'Job posting found' })
  @ApiNotFoundResponse({ description: 'Job posting not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID parameter' })
  findOne(@Param('id') id: string) {
    return this.jobPostingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job posting by ID' })
  @ApiParam({ name: 'id', description: 'ID of the job posting to update' })
  @ApiResponse({ status: 200, description: 'Job posting updated successfully' })
  @ApiNotFoundResponse({ description: 'Job posting not found' })
  @ApiBadRequestResponse({ description: 'Invalid update data or ID' })
  update(
    @Param('id') id: string,
    @Body() updateJobPostingDto: UpdateJobPostingDto,
  ) {
    return this.jobPostingsService.update(+id, updateJobPostingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job posting by ID' })
  @ApiParam({ name: 'id', description: 'ID of the job posting to delete' })
  @ApiResponse({ status: 200, description: 'Job posting deleted successfully' })
  @ApiNotFoundResponse({ description: 'Job posting not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID parameter' })
  remove(@Param('id') id: string) {
    return this.jobPostingsService.remove(+id);
  }
}
