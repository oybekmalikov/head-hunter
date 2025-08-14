import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsInt, Min, IsOptional } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({
    example: 'IT & Software',
    description: 'The name of the skill',
  })
  @IsNotEmpty({ message: 'Skill name is required.' })
  @IsString({ message: 'Skill name must be a string.' })
  @Length(0, 55, {
    message: 'Skill name must be between 3 and 55 characters.',
  })
  name: string;

  @ApiProperty({
    example: 'Jobs related to IT industry including software, hardware, etc.',
    description: 'Detailed description of the skill',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the related skill category',
  })
  @IsNotEmpty({ message: 'Category ID is required.' })
  @IsInt({ message: 'Category ID must be an integer.' })
  @Min(1, { message: 'Category ID must be at least 1.' })
  categoryId: number;
}
