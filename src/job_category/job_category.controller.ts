import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobCategoryService } from './job_category.service';
import { CreateJobCategoryDto } from './dto/create-job_category.dto';
import { UpdateJobCategoryDto } from './dto/update-job_category.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Job Category')
@Controller('job-category')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job category' })
  @ApiResponse({ status: 201, description: 'Job category successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryService.create(createJobCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job categories' })
  @ApiResponse({ status: 200, description: 'List of job categories returned successfully.' })
  findAll() {
    return this.jobCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job category by ID' })
  @ApiResponse({ status: 200, description: 'Job category found.' })
  @ApiResponse({ status: 404, description: 'Job category not found.' })
  findOne(@Param('id') id: string) {
    return this.jobCategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job category by ID' })
  @ApiResponse({ status: 200, description: 'Job category updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid update data.' })
  @ApiResponse({ status: 404, description: 'Job category not found.' })
  update(@Param('id') id: string, @Body() updateJobCategoryDto: UpdateJobCategoryDto) {
    return this.jobCategoryService.update(+id, updateJobCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job category by ID' })
  @ApiResponse({ status: 204, description: 'Job category deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Job category not found.' })
  remove(@Param('id') id: string) {
    return this.jobCategoryService.remove(+id);
  }
}
