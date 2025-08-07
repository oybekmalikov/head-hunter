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
  @ApiOperation({ summary: 'Yangi kompaniya yaratish' })
  @ApiResponse({ status: 201, description: 'Kompaniya muvaffaqiyatli yaratildi' })
  @ApiBody({ type: CreateCompanyDto })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kompaniyalarni olish' })
  @ApiResponse({ status: 200, description: 'Kompaniyalar ro‘yxati' })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Kompaniyani ID orqali olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Kompaniya ID raqami' })
  @ApiResponse({ status: 200, description: 'Topilgan kompaniya' })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Kompaniyani tahrirlash' })
  @ApiParam({ name: 'id', type: Number, description: 'Tahrir qilinayotgan kompaniya ID raqami' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: 'Kompaniya yangilandi' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kompaniyani o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'O‘chiriladigan kompaniya ID raqami' })
  @ApiResponse({ status: 200, description: 'Kompaniya muvaffaqiyatli o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
