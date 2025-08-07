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
  @ApiOperation({ summary: 'Yangi taʼlim maʼlumotini yaratish' })
  @ApiResponse({ status: 201, description: 'Taʼlim maʼlumotlari muvaffaqiyatli yaratildi' })
  @ApiBody({ type: CreateEduDto })
  create(@Body() createEduDto: CreateEduDto) {
    return this.eduService.create(createEduDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha taʼlim yozuvlarini olish' })
  @ApiResponse({ status: 200, description: 'Barcha taʼlim maʼlumotlari' })
  findAll() {
    return this.eduService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha taʼlim yozuvini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Taʼlim ID raqami' })
  @ApiResponse({ status: 200, description: 'Topilgan taʼlim yozuvi' })
  findOne(@Param('id') id: string) {
    return this.eduService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Taʼlim yozuvini yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Yangilanishi kerak bo‘lgan taʼlim ID' })
  @ApiBody({ type: UpdateEduDto })
  @ApiResponse({ status: 200, description: 'Taʼlim maʼlumotlari yangilandi' })
  update(@Param('id') id: string, @Body() updateEduDto: UpdateEduDto) {
    return this.eduService.update(+id, updateEduDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Taʼlim yozuvini o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'O‘chiriladigan taʼlim ID' })
  @ApiResponse({ status: 200, description: 'Taʼlim maʼlumotlari o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.eduService.remove(+id);
  }
}
