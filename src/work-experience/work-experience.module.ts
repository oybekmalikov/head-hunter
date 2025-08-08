import { Module } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { WorkExperienceController } from './work-experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkExperience } from './entities/work-experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience])],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService],
})
export class WorkExperienceModule { }
