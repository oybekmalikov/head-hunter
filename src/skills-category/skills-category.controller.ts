import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreateSkillsCategoryDto } from "./dto/create-skills_category.dto";
import { UpdateSkillsCategoryDto } from "./dto/update-skills_category.dto";
import { SkillsCategoryService } from "./skills-category.service";

@ApiTags("Skills Category")
@Controller("skills-category")
export class SkillsCategoryController {
  constructor(private readonly skillsCategoryService: SkillsCategoryService) {}

  @ApiOperation({
    summary: "Find all skills by name",
    description: "Returns a list of skills by name",
  })
  @ApiResponse({
    status: 200,
    description: "A list of all skill categories.",
  })
  @UseGuards(AuthGuard)
  @Get("skill-category-name/:name")
  async findAllByName(@Param("name") name: string) {
    return this.skillsCategoryService.findAllByName(name);
  }
  @ApiOperation({ summary: "Create a new skills category" })
  @ApiResponse({
    status: 201,
    description: "The category has been successfully created.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "skillsCategory"))
  @Post()
  create(
    @Body() createSkillsCategoryDto: CreateSkillsCategoryDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin"||user.role === "superadmin") {
      return this.skillsCategoryService.create(createSkillsCategoryDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({ summary: "Get all skills categories" })
  @ApiResponse({
    status: 200,
    description: "A list of all skill categories.",
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.skillsCategoryService.findAll();
  }

  @ApiOperation({
    summary: "Get all skills categories with pagination",
    description: "Returns a paginated list of skill categories",
  })
  @ApiResponse({
    status: 200,
    description: "A paginated list of skill categories.",
  })
  @UseGuards(AuthGuard)
  @Get("pagination")
  findAllWithPagination(
    @Query("page") page: string,
    @Query("limit") limit: string,
  ) {
    return this.skillsCategoryService.findAllWithPagination(+page, +limit);
  }

  @ApiOperation({ summary: "Get a single skills category by ID" })
  @ApiResponse({
    status: 200,
    description: "The skill category was found.",
  })
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.skillsCategoryService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a skills category by ID" })
  @ApiBody({ type: UpdateSkillsCategoryDto })
  @ApiResponse({
    status: 200,
    description: "The category was successfully updated.",
  })
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSkillsCategoryDto: UpdateSkillsCategoryDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin"||user.role === "superadmin") {
      return this.skillsCategoryService.update(+id, updateSkillsCategoryDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({ summary: "Delete a skills category by ID" })
  @ApiResponse({
    status: 200,
    description: "The category was successfully deleted.",
  })
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin"||user.role === "superadmin") {
      return this.skillsCategoryService.remove(+id);
    }
    throw new ForbiddenException("Access denied");
  }
}
