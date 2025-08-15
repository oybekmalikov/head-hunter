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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: "Create user",
    description: "The user is added to the system through data.",
  })
  @ApiResponse({
    status: 201,
    description: "The user was successfully created.",
    type: CreateUserDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: "Create admin",
    description: "The admin is added to the system through data.",
  })
  @ApiResponse({
    status: 201,
    description: "The admin was successfully created.",
    type: CreateUserDto,
  })
  @UseGuards(AuthGuard)
  @Post("admin")
  createAdmin(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role !== "superadmin") throw new ForbiddenException("Access denied");
    return this.usersService.createAdmin(createUserDto);
  }

  @ApiOperation({
    summary: "Get all users",
    description: "Get all users in the system.",
  })
  @ApiResponse({
    status: 200,
    description: "The users were successfully received.",
    type: [User],
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin") {
      return this.usersService.findAll();
    } else if (user.role === "jobseeker" || user.role === "employer") {
      return this.usersService.findOne(user.id);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all users by pagination",
    description: "Get all users by pagination in the system.",
  })
  @ApiResponse({
    status: 200,
    description: "The users were successfully received.",
  })
  @UseGuards(AuthGuard)
  @Get("pagination")
  findAllByPagination(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin") {
      return this.usersService.findAllByPagination(page, limit);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get user by id",
    description: "Output user by id",
  })
  @ApiResponse({
    status: 200,
    description: "The user was successfully received.",
    type: User,
  })
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.id === +id) {
      return this.usersService.findOne(+id);
    }
    throw new ForbiddenException("Access denied");
  }

  // UPDATE
  @ApiOperation({
    summary: "Update user by id number",
    description: "Admin updates user via this endpoint",
  })
  @ApiResponse({
    status: 200,
    description: "The user was successfully updated.",
    type: UpdateUserDto,
  })
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.id === +id) {
      return this.usersService.update(+id, updateUserDto);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Delete user by id number",
    description: "Admin deletes user via this endpoint",
  })
  @ApiResponse({
    status: 200,
    description: "The user was successfully deleted.",
  })
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.id === +id) {
      return this.usersService.remove(+id);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get user profile",
    description: "Get user profile by id",
  })
  @ApiResponse({
    status: 200,
    description: "The user profile was successfully received.",
  })
  @UseGuards(AuthGuard)
  @Get("profile")
  userProfile(@Req() req: Request) {
    const user = (req as any).user;
    return this.usersService.userProfile(user.id);
  }
}
