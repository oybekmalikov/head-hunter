import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // CREATE
  @ApiOperation({
    summary: "Create user",
    description: "The user is added to the system through data."
  })
  @ApiResponse({
    status: 201,
    description: "The user was successfully created.",
    type: CreateUserDto
  })
  @ApiResponse({
    status: 400,
    description: "Error creating user"
  })
  @ApiResponse({
    status: 409,
    description: "Such user exists"
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // FINDALL
  @ApiOperation({
    summary: "Get all users",
    description: "Get all users in the system."
  })
  @ApiResponse({
    status: 200,
    description: "The users were successfully received.",
    type: [User]
  })
  @ApiResponse({
    status: 400,
    description: "Error while logging out users"
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number
  ) {
    return this.usersService.findAll(page, limit);
  }

  // FINDONE
  @ApiOperation({
    summary: "Get user by id",
    description: "Output user by id"
  })
  @ApiResponse({
    status: 200,
    description: "The user was successfully received.",
    type: User
  })
  @ApiResponse({
    status: 400,
    description: "The user was not received."
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized"
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // UPDATE
  @ApiOperation({
    summary: "Update user by id number",
    description: "Admin updates user via this endpoint"
  })
  @ApiResponse({
    status: 200,
    description: "The user was successfully updated.",
    type: UpdateUserDto
  })
  @ApiResponse({
    status: 400,
    description: "error while changing user"
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized"
  })
  @ApiResponse({
    status: 409,
    description: "Such user exists"
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: "Delete user by id number",
    description: "Admin deletes user via this endpoint"
  })
  @ApiResponse({
    status: 200,
    description: "The user was successfully deleted."
  })
  @ApiResponse({
    status: 400,
    description: "Error deleting user"
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized"
  })
  @ApiResponse({
    status: 404,
    description: "User not found"
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error."
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
