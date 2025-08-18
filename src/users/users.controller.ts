import {
  BadRequestException,
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { FileUploadService } from "../common/services/file-upload.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  DeleteAvatarResponseDto,
  UploadAvatarResponseDto,
} from "./dto/upload-avatar.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  
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

  @ApiOperation({
    summary: "Upload user profile image",
    description: "Upload a profile image for the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "Profile image uploaded successfully",
    type: UploadAvatarResponseDto,
  })
  @UseGuards(AuthGuard)
  @Post("upload-avatar")
  @UseInterceptors(
    FileInterceptor("avatar", new FileUploadService().getMulterConfig()),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }
    const user = (req as any).user;
    if (!user) {
      throw new ForbiddenException("Access denied");
    }
    return this.usersService.uploadUserAvatar(user.id, file);
  }
  @ApiOperation({
    summary: "Delete user profile image",
    description: "Delete the profile image for the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "Profile image deleted successfully",
    type: DeleteAvatarResponseDto,
  })
  @UseGuards(AuthGuard)
  @Delete("delete-avatar")
  async deleteAvatar(@Req() req: Request) {
    const user = (req as any).user;
    if (!user) {
      throw new ForbiddenException("User not found");
    }
    return this.usersService.deleteUserAvatar(user.id);
  }
  @ApiOperation({
    summary: "Create user",
    description: "The user is added to the system through data.",
  })
  @ApiResponse({
    status: 201,
    description: "The user was successfully created.",
    type: CreateUserDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "superadmin" || user.role === "admin") {
      return this.usersService.create(createUserDto);
    }
    throw new ForbiddenException("Access denied");
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
    if (user.role !== "superadmin")
      throw new ForbiddenException("Access denied");
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
    if (user.role === "superadmin") {
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
    if (user.role === "superadmin") {
      return this.usersService.findAllByPagination(page, limit);
    }
    throw new ForbiddenException("Access denied");
  }
  
  @ApiOperation({
    summary: "Get all users",
    description: "Get all users in the system.",
  })
  @ApiResponse({
    status: 200,
    description: "The users were successfully received.",
  })
  @UseGuards(AuthGuard)
  @Get("all-users")
  findAllUsers(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.usersService.findAllUsers(page, limit);
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
    if (user.role === "admin" || user.role === "superadmin") {
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
}
