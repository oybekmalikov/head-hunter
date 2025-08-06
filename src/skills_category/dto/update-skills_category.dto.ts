import { PartialType } from "@nestjs/swagger";
import { CreateSkillsCategoryDto } from "./create-skills_category.dto";

export class UpdateSkillsCategoryDto extends PartialType(
  CreateSkillsCategoryDto
) {}
