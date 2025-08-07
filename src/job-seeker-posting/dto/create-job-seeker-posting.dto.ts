import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobSeekerPostingDto {
  @ApiProperty({ example: 'Tashkent', description: 'Shahar nomi' })
  @IsString()
  city: string;

  @ApiProperty({ example: '1000$', description: 'Talab qilinayotgan maosh' })
  @IsString()
  salary: string;

  @ApiProperty({ example: '2 oy', description: 'Ariza topshirish uchun mavjud vaqt' })
  @IsString()
  time_for_apply: string;

  @ApiProperty({ example: 'React frontend lavozimlariga mos ish izlayapman', description: 'Ish qidiruvchining maqsadi' })
  @IsString()
  target: string;

  @ApiProperty({ example: '123', description: 'Skills jadvalidan skill ID (foreign key)' })
  @IsString()
  skills_id: string;

  @ApiProperty({ example: '456', description: 'Job seeker ID (foreign key)' })
  @IsString()
  job_seeker_id: string;
}
