import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SkillsCategory } from "../skills-category/entities/skills_category.entity";
import { Skill } from "./entities/skill.entity";
import { SkillsController } from "./skills.controller";
import { SkillsService } from "./skills.service";

@Module({
  imports: [TypeOrmModule.forFeature([Skill, SkillsCategory])],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
