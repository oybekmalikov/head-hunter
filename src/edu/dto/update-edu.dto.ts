import { PartialType } from '@nestjs/swagger';
import { CreateEduDto } from './create-edu.dto';

export class UpdateEduDto extends PartialType(CreateEduDto) {}
