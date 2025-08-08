import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobSeekerService } from './job-seekers.service';
import { CreateJobSeekerDto } from './dto/create-job-seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job-seeker.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JobSeeker } from './entities/job-seeker.entity';

@Controller('job-seekers')
export class JobSeekersController {
  constructor(private readonly jobSeekerService: JobSeekerService) { }

  @ApiOperation({
    summary: 'Create job seeker',
    description: 'Create job seeker',
  })
  @ApiResponse({
    status: 201,
    description: 'The job seeker has been successfully created.',
    type: CreateJobSeekerDto,
  })
  @Post()
  create(@Body() createJobSeekerDto: CreateJobSeekerDto) {
    return this.jobSeekerService.create(createJobSeekerDto);
  }

  @ApiOperation({
    summary: 'Get all job seekers',
    description: 'Get all job seekers',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all job seekers',
    type: [JobSeeker],
  })
  @Get()
  findAll() {
    return this.jobSeekerService.findAll();
  }

  @ApiOperation({
    summary: 'Get job seeker by id',
    description: 'Get job seeker by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Return job seeker by id',
    type: JobSeeker,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobSeekerService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update job seeker',
    description: 'Update job seeker',
  })
  @ApiResponse({
    status: 200,
    description: 'The job seeker has been successfully updated.',
    type: UpdateJobSeekerDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobSeekerDto: UpdateJobSeekerDto) {
    return this.jobSeekerService.update(+id, updateJobSeekerDto);
  }

  @ApiOperation({
    summary: 'Delete job seeker',
    description: 'Delete job seeker',
  })
  @ApiResponse({
    status: 200,
    description: 'The job seeker has been successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobSeekerService.remove(+id);
  }
}