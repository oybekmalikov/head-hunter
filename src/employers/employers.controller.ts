import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Employer } from './entities/employer.entity';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) { }

  // CREATE
  @ApiOperation({
    summary: 'Create Employer',
    description: 'The employer is added to the system through data.',
  })
  @ApiResponse({
    status: 201,
    description: 'The employer has been successfully added to the system.',
    type: CreateEmployerDto
  })
  @ApiResponse({
    status: 400,
    description: "The employer cannot be added to the system."
  })
  @ApiResponse({
    status: 404,
    description: "User or company not found."
  })
  @ApiResponse({
    status: 409,
    description: "The employer already exists in the system."
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Post()
  async create(@Body() createEmployerDto: CreateEmployerDto) {

    const employer = await this.employersService.create(createEmployerDto);
    console.log(employer);

    return employer;
  }

  // FIND ALL
  @ApiOperation({
    summary: 'Get all employers',
    description: 'Get all employers in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'All employers have been successfully received.',
    type: [Employer]
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Get()
  findAll() {
    return this.employersService.findAll();
  }

  // FIND ONE
  @ApiOperation({
    summary: 'Get employer by id',
    description: 'Get employer by id in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'The employer has been successfully received.',
    type: Employer
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employersService.findOne(+id);
  }

  // UPDATE
  @ApiOperation({
    summary: 'Update employer by id',
    description: 'Update employer by id in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'The employer has been successfully updated.',
    type: UpdateEmployerDto
  })
  @ApiResponse({
    status: 400,
    description: "The employer cannot be updated."
  })
  @ApiResponse({
    status: 404,
    description: "User or company not found."
  })
  @ApiResponse({
    status: 409,
    description: "The employer already exists in the system."
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
    return this.employersService.update(+id, updateEmployerDto);
  }

  // DELETE
  @ApiOperation({
    summary: 'Delete employer by id',
    description: 'Delete employer by id in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'The employer has been successfully deleted.'
  })
  @ApiResponse({
    status: 404,
    description: "Employer not found."
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}