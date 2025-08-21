import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SkillsCategory } from "./entities/skills_category.entity";
import { SkillsCategoryController } from "./skills-category.controller";
import { SkillsCategoryService } from "./skills-category.service";

@Module({
  imports: [TypeOrmModule.forFeature([SkillsCategory])],
  controllers: [SkillsCategoryController],
  providers: [SkillsCategoryService],
  exports: [SkillsCategoryService],
})
export class SkillsCategoryModule {}
