import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Employer } from './entities/employer.entity';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) { }
  @ApiOperation({
    summary: 'Create Employer',
    description: 'The employer is added to the system through data.',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'The employer has been successfully added to the system.',
  })
  @Post()
  async create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employersService.create(createEmployerDto);
  }

  @ApiOperation({
    summary: 'Get all employers',
    description: 'Get all employers in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'All employers have been successfully received.',
  })
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number
  ) {
    return this.employersService.findAll(page, limit);
  }

  @ApiOperation({
    summary: 'Get employer by id',
    description: 'Get employer by id in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'The employer has been successfully received.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employersService.findOne(+id);
  }
  
  @ApiOperation({
    summary: 'Update employer by id',
    description: 'Update employer by id in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'The employer has been successfully updated.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
    return this.employersService.update(+id, updateEmployerDto);
  }
  
  @ApiOperation({
    summary: 'Delete employer by id',
    description: 'Delete employer by id in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'The employer has been successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}
