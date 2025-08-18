import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chats.dto";
import { UpdateChatDto } from "./dto/update-chats.dto";

@ApiTags("All Chats")
@Controller("chats")
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: "Create a new chat" })
  @ApiResponse({ status: 201, description: "Chat created successfully" })
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @ApiOperation({ summary: "Get all chats" })
  @ApiResponse({ status: 200, description: "Chats retrieved successfully" })
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "superadmin" || user.role === "admin") {
      return this.chatsService.findAll();
    }
    return this.chatsService.findAllByUserId(user.id);
  }

  @ApiOperation({ summary: "Get a chat by id" })
  @ApiResponse({ status: 200, description: "Chat retrieved successfully" })
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "superadmin" || user.role === "admin") {
      return this.chatsService.findOne(+id);
    }
    return this.chatsService.findOne(+id, +user.id);
  }

  @ApiOperation({ summary: "Update a chat by id" })
  @ApiResponse({ status: 200, description: "Chat updated successfully" })
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateChatDto: UpdateChatDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "superadmin" || user.role === "admin") {
      return this.chatsService.update(+id, updateChatDto);
    } else if (updateChatDto.isArchived) {
      return this.chatsService.update(+id, {
        isArchived: updateChatDto.isArchived,
      });
    }
  }

  @ApiOperation({ summary: "Delete a chat by id" })
  @ApiResponse({ status: 200, description: "Chat deleted successfully" })
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "superadmin" || user.role === "admin") {
      return this.chatsService.remove(+id);
    } else {
      return this.chatsService.update(+id, { isDeleted: true });
    }
  }

  @ApiOperation({ summary: "Get all archived chats" })
  @ApiResponse({
    status: 200,
    description: "Archived chats retrieved successfully",
  })
  @UseGuards(AuthGuard)
  @Get("archived")
  findAllArchived(@Req() req: Request, @Param("userId") userId: string) {
    const user = (req as any).user;
    if (
      user.role === "superadmin" ||
      user.role === "admin" ||
      +userId === +user.id
    ) {
      return this.chatsService.findAllByUserIdAndArchived(+userId);
    }
    return {
      message: "You have no access to this chat",
      success: false,
    };
  }
}
