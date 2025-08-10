import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobSeekerPostingDto {
  @ApiProperty({ example: 'Tashkent', description: 'Shahar nomi' })
  @IsString()
  city: string;

  @ApiProperty({ example: '1000$', description: 'Talab qilinayotgan maosh' })
  @IsString({ message: 'Salary must be a string' })
  salary: string;

  @ApiProperty({ example: '2 oy', description: 'Ariza topshirish uchun mavjud vaqt' })
  @IsString({ message: 'Time for apply must be a string' })
  timeForApply: string;

  @ApiProperty({ example: 'React frontend lavozimlariga mos ish izlayapman', description: 'Ish qidiruvchining maqsadi' })
  @IsString({ message: 'Target must be a string' })
  target: string;
  
  @ApiProperty({ example: '456', description: 'Job seeker ID (foreign key)' })
  @IsNotEmpty({ message: 'Job seeker ID is required' })
  @IsNumber({},{ message: 'Job seeker ID must be a number' })
  jobSeekerId: number;
}
