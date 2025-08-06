import { Module } from "@nestjs/common";
import { SkillsCategoryService } from "./skills_category.service";
import { SkillsCategoryController } from "./skills_category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SkillsCategory } from "./entities/skills_category.entity";
import { Skill } from "../skills/entities/skill.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SkillsCategory, Skill])],
  controllers: [SkillsCategoryController],
  providers: [SkillsCategoryService],
  exports: [SkillsCategoryService],
})
export class SkillsCategoryModule {}
