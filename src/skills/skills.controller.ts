import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { SkillsService } from "./skills.service";

@ApiTags("Skills")
@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({ summary: "Create a new skill" })
  @ApiResponse({ status: 201, description: "Created" })
  @UseGuards(new AccessControlGuard(accessMatrix, "skills"))
  @Post()
  create(@Body() createSkillDto: CreateSkillDto, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin") {
      return this.skillsService.create(createSkillDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({ summary: "Get all skills" })
  @ApiResponse({
    status: 200,
    description: "List of skills retrieved successfully.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "skills"))
  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @ApiOperation({
    summary: "Get skills with pagination",
    description: "Retrieve skills with pagination support",
  })
  @ApiResponse({
    status: 200,
    description: "Skills retrieved with pagination.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "skills"))
  @Get("pagination")
  findAllByPagination(
    @Query("page") page: string,
    @Query("limit") limit: string,
  ) {
    return this.skillsService.findAllByPagination(+page, +limit);
  }

  @ApiOperation({ summary: "Get skill by ID" })
  @ApiResponse({ status: 200, description: "Skill retrieved successfully." })
  @UseGuards(new AccessControlGuard(accessMatrix, "skills"))
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.skillsService.findOne(id);
  }

  @ApiOperation({ summary: "Update skill by ID" })
  @ApiResponse({ status: 200, description: "Skill updated successfully." })
  @UseGuards(new AccessControlGuard(accessMatrix, "skills"))
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSkillDto: UpdateSkillDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin") {
      return this.skillsService.update(id, updateSkillDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({ summary: "Delete skill by ID" })
  @ApiResponse({ status: 200, description: "Skill deleted successfully." })
  @UseGuards(new AccessControlGuard(accessMatrix, "skills"))
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin") {
      return this.skillsService.remove(id);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get skills by name",
    description: "Search for skills by name",
  })
  @ApiResponse({ status: 200, description: "Skills found by name." })
  @UseGuards(new AccessControlGuard(accessMatrix, "skills"))
  @Get("search/:name")
  findByName(@Param("name") name: string) {
    return this.skillsService.findAllByName(name);
  }

  @ApiOperation({ summary: "Get skills by category ID" })
  @ApiResponse({ status: 200, description: "Skills found by category ID." })
  @UseGuards(new AccessControlGuard(accessMatrix, "skills"))
  @Get("category/:categoryId")
  findByCategoryId(@Param("categoryId", ParseIntPipe) categoryId: number) {
    return this.skillsService.findAllByCategory(categoryId);
  }
}
