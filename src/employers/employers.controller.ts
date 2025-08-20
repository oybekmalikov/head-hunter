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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { CreateEmployerDto } from "./dto/create-employer.dto";
import { UpdateEmployerDto } from "./dto/update-employer.dto";
import { EmployersService } from "./employers.service";

@ApiTags("Employers")
@Controller("employers")
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}
  
  @ApiOperation({
    summary: "Get employer profile",
    description: "Get employer profile by id",
  })
  @ApiResponse({
    status: 200,
    description: "The employer profile was successfully received.",
  })
  @UseGuards(AuthGuard)
  @Get("profile")
  userProfile(@Req() req: Request) {
    const user = (req as any).user;
    return this.employersService.userProfile(user.id);
  }
  @ApiOperation({
    summary: "Create Employer",
    description: "The employer is added to the system through data.",
  })
  @ApiResponse({
    status: 201,
    description: "The employer has been successfully added to the system.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "employers"))
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employersService.create(createEmployerDto);
  }
  @ApiOperation({
    summary: "Get all employers",
    description: "Get all employers in the system.",
  })
  @ApiResponse({
    status: 200,
    description: "All employers have been successfully received.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "employers"))
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin"||user.role === "superadmin") {
      return this.employersService.findAll();
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all employers by pagination",
    description: "Get all employers by pagination in the system.",
  })
  @ApiResponse({
    status: 200,
    description: "All employers have been successfully received.",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "employers"))
  @UseGuards(AuthGuard)
  @Get("pagination")
  findAllByPagination(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin"||user.role === "superadmin") {
      return this.employersService.findAllByPagination(page, limit);
    }
    throw new ForbiddenException("Access denied");
  }
  @ApiOperation({
    summary: "Get employer by id",
    description: "Get employer by id in the system.",
  })
  @ApiResponse({
    status: 200,
    description: "The employer has been successfully received.",
  })
  @UseGuards(
    new AccessControlGuard(accessMatrix, "employers"),
    new SelfGuard("id", "id"),
  )
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employersService.findOne(+id);
  }
  @ApiOperation({
    summary: "Update employer by id",
    description: "Update employer by id in the system.",
  })
  @ApiResponse({
    status: 200,
    description: "The employer has been successfully updated.",
  })
  @UseGuards(
    new AccessControlGuard(accessMatrix, "employers"),
    new SelfGuard("id", "id"),
  )
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ) {
    return this.employersService.update(+id, updateEmployerDto);
  }
  @ApiOperation({
    summary: "Delete employer by id",
    description: "Delete employer by id in the system.",
  })
  @ApiResponse({
    status: 200,
    description: "The employer has been successfully deleted.",
  })
  @UseGuards(
    new AccessControlGuard(accessMatrix, "employers"),
    new SelfGuard("id", "id"),
  )
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employersService.remove(+id);
  }
}
