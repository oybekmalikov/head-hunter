import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EduService } from './edu.service';
import { CreateEduDto } from './dto/create-edu.dto';
import { UpdateEduDto } from './dto/update-edu.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Education')
@Controller('edu')
export class EduController {
  constructor(private readonly eduService: EduService) {}

  @Post()
  @ApiOperation({ summary: 'Create new educational information of jobseeker' })
  @ApiResponse({ status: 201, description: 'Educational information created' })
  @ApiBody({ type: CreateEduDto })
  create(@Body() createEduDto: CreateEduDto) {
    return this.eduService.create(createEduDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all educational information' })
  @ApiResponse({ status: 200, description: 'All educational information' })
  findAll() {
    return this.eduService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one educational information' })
  @ApiResponse({ status: 200, description: 'One educational information' })
  findOne(@Param('id') id: string) {
    return this.eduService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update educational information' })
  @ApiResponse({ status: 200, description: 'Educational information updated' })
  update(@Param('id') id: string, @Body() updateEduDto: UpdateEduDto) {
    return this.eduService.update(+id, updateEduDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete educational information' })
  @ApiResponse({ status: 200, description: 'Educational information deleted' })
  remove(@Param('id') id: string) {
    return this.eduService.remove(+id);
  }
}
