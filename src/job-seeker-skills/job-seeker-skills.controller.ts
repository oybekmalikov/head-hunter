import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobSeekerSkillsService } from './job-seeker-skills.service';
import { CreateJobSeekerSkillDto } from './dto/create-job-seeker-skill.dto';
import { UpdateJobSeekerSkillDto } from './dto/update-job-seeker-skill.dto';

@Controller('job-seeker-skills')
export class JobSeekerSkillsController {
  constructor(private readonly jobSeekerSkillsService: JobSeekerSkillsService) {}

  @Post()
  create(@Body() createJobSeekerSkillDto: CreateJobSeekerSkillDto) {
    return this.jobSeekerSkillsService.create(createJobSeekerSkillDto);
  }

  @Get()
  findAll() {
    return this.jobSeekerSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobSeekerSkillsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobSeekerSkillDto: UpdateJobSeekerSkillDto) {
    return this.jobSeekerSkillsService.update(+id, updateJobSeekerSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobSeekerSkillsService.remove(+id);
  }
}
