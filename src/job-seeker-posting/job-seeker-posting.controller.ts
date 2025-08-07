import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobSeekerPostingService } from './job-seeker-posting.service';
import { CreateJobSeekerPostingDto } from './dto/create-job-seeker-posting.dto';
import { UpdateJobSeekerPostingDto } from './dto/update-job-seeker-posting.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Job Seeker Postings')
@Controller('job-seeker-posting')
export class JobSeekerPostingController {
  constructor(
    private readonly jobSeekerPostingService: JobSeekerPostingService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job seeker posting' })
  @ApiResponse({ status: 201, description: 'Posting created successfully' })
  @ApiBody({ type: CreateJobSeekerPostingDto })
  create(@Body() createDto: CreateJobSeekerPostingDto) {
    return this.jobSeekerPostingService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job seeker postings' })
  @ApiResponse({ status: 200, description: 'All postings returned' })
  findAll() {
    return this.jobSeekerPostingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single job seeker posting by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Posting found' })
  @ApiResponse({ status: 404, description: 'Posting not found' })
  findOne(@Param('id') id: string) {
    return this.jobSeekerPostingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job seeker posting by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Posting updated' })
  @ApiBody({ type: UpdateJobSeekerPostingDto })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateJobSeekerPostingDto,
  ) {
    return this.jobSeekerPostingService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job seeker posting by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Posting deleted' })
  remove(@Param('id') id: string) {
    return this.jobSeekerPostingService.remove(+id);
  }
}
