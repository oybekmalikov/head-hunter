import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create new company', description: 'This endpoint allows you to create a new company.' })
  @ApiResponse({ status: 201, description: 'Create new company' })
  @ApiBody({ type: CreateCompanyDto })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all compamnies', description: 'This endpoint retrieves all companies.' })
  @ApiResponse({ status: 200, description: 'List of compnaies' })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Companies by id',description: 'This endpoint retrieves a company by its ID.' })
  @ApiResponse({ status: 200, description: 'Get companies by id' })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get Companies by name',description: 'This endpoint retrieves a company by its name.' })
  @ApiResponse({ status: 200, description: 'Get companies by name' })
  findOneByName(@Body('name') name: string) {
    return this.companyService.findOneByName(name);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit Company',description: 'This endpoint allows you to update a company by its ID.' })
  @ApiResponse({ status: 200, description: 'Company updated' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company',description: 'This endpoint allows you to delete a company by its ID.' })
  @ApiResponse({ status: 200, description: 'Company deleted' })
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
