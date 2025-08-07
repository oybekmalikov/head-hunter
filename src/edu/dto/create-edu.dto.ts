import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEduDto {
  @ApiProperty({ example: 'TATU', description: 'O‘quv yurti nomi' })
  @IsString()
  @IsNotEmpty()
  inst_name: string;

  @ApiProperty({ example: 'Axborot xavfsizligi', description: 'Fakultet nomi' })
  @IsString()
  @IsNotEmpty()
  faculty: string;

  @ApiProperty({ example: 3, description: 'Daraja (1 - bakalavr, 2 - magistr, ...)' })
  @IsNumber()
  dagree: number;

  @ApiProperty({ example: '2020-09-01', description: 'Boshlanish sanasi', type: String, format: 'date' })
  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @ApiProperty({ example: '2024-06-30', description: 'Tugash sanasi (ixtiyoriy)', type: String, format: 'date', required: false })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  end_date?: Date;

  @ApiProperty({ example: false, description: 'Hozir ham o‘qiyapti yoki yo‘q' })
  @IsBoolean()
  is_current: boolean;

  @ApiProperty({ example: 'Diplom himoya qilindi', description: 'Qo‘shimcha izoh (ixtiyoriy)', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 5, description: 'Job seeker ID raqami (tashqi kalit)' })
  @IsNumber()
  job_seeker_id: number;
}
