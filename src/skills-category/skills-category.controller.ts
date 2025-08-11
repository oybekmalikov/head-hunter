import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateSkillsCategoryDto } from "./dto/create-skills_category.dto";
import { UpdateSkillsCategoryDto } from "./dto/update-skills_category.dto";
import { SkillsCategoryService } from "./skills-category.service";
import { SkillsCategory } from "./entities/skills_category.entity";

@ApiTags("Skills Category")
@Controller("skills-category")
export class SkillsCategoryController {
  constructor(private readonly skillsCategoryService: SkillsCategoryService) {}

  @Post()
  @ApiOperation({ summary: "Create a new skills category" })
  @ApiBody({ type: CreateSkillsCategoryDto })
  @ApiResponse({
    status: 201,
    description: "The category has been successfully created.",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. Validation failed or missing fields.",
  })
  create(@Body() createSkillsCategoryDto: CreateSkillsCategoryDto) {
    return this.skillsCategoryService.create(createSkillsCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all skills categories" })
  @ApiResponse({
    status: 200,
    description: "A list of all skill categories.",
  })
  findAll() {
    return this.skillsCategoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single skills category by ID" })
  @ApiParam({ name: "id", description: "ID of the category", example: 1 })
  @ApiResponse({
    status: 200,
    description: "The skill category was found.",
  })
  @ApiResponse({
    status: 404,
    description: "Category not found.",
  })
  findOne(@Param("id") id: string) {
    return this.skillsCategoryService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a skills category by ID" })
  @ApiParam({ name: "id", description: "ID of the category", example: 1 })
  @ApiBody({ type: UpdateSkillsCategoryDto })
  @ApiResponse({
    status: 200,
    description: "The category was successfully updated.",
  })
  @ApiResponse({
    status: 404,
    description: "Category not found.",
  })
  update(
    @Param("id") id: string,
    @Body() updateSkillsCategoryDto: UpdateSkillsCategoryDto,
  ) {
    return this.skillsCategoryService.update(+id, updateSkillsCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a skills category by ID" })
  @ApiParam({ name: "id", description: "ID of the category", example: 1 })
  @ApiResponse({
    status: 200,
    description: "The category was successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Category not found.",
  })
  remove(@Param("id") id: string) {
    return this.skillsCategoryService.remove(+id);
  }

  @Get("skill-category-name/:name")
  @ApiOkResponse({ type: [SkillsCategory] })
  @ApiParam({ name: "name", example: "Programming" })
  async findAllByName(@Param("name") name: string) {
    return this.skillsCategoryService.findAllByName(name);
  }
}
