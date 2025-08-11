import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { SkillsService } from "./skills.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
} from "@nestjs/swagger";
import { Skill } from "./entities/skill.entity";

@ApiTags("Skills") // Swagger UI'da guruh nomi
@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new skill" })
  @ApiResponse({ status: 201, description: "Created" })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all skills" })
  @ApiResponse({
    status: 200,
    description: "List of skills retrieved successfully.",
  })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get skill by ID" })
  @ApiResponse({ status: 200, description: "Skill retrieved successfully." })
  @ApiNotFoundResponse({ description: "Skill not found." })
  @ApiBadRequestResponse({ description: "Invalid ID format." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.skillsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update skill by ID" })
  @ApiResponse({ status: 200, description: "Skill updated successfully." })
  @ApiNotFoundResponse({ description: "Skill not found." })
  @ApiBadRequestResponse({ description: "Validation failed or invalid ID." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete skill by ID" })
  @ApiResponse({ status: 200, description: "Skill deleted successfully." })
  @ApiNotFoundResponse({ description: "Skill not found." })
  @ApiBadRequestResponse({ description: "Invalid ID format." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.skillsService.remove(id);
  }

  @Get("skill-name/:name")
  @ApiOkResponse({ type: [Skill] })
  @ApiParam({ name: "name", example: "Programming" })
  async findAllByName(@Param("name") name: string) {
    return this.skillsService.findAllByName(name);
  }

  @Get("skill-category-categoryid/:categoryId")
  @ApiOperation({
    summary: "Get all skills by category ID",
    description: "Retrieve all skills belonging to a specific skill category.",
  })
  @ApiParam({ name: "categoryId", example: 1 })
  async findAllByCategoryId(@Param("categoryId") categoryId: string) {
    return this.skillsService.findAllByCategoryId(+categoryId);
  }
}
