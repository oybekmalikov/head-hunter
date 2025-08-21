import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
import { SelfGuard } from "../common/guards/self.guard";
import { ChatService } from "./chat.service";
import { CreateChatPrivateDto } from "./dto/create-chat.dto";
import { UpdatePrivateChatDto } from "./dto/update-chat.dto";

@ApiTags("Chat")
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({
    summary: "Get all chat messages for a specific sender",
    description: "Get all chat messages for a specific sender",
  })
  @ApiResponse({
    status: 200,
    description: "List of chat messages retrieved successfully",
  })
  @Get("sender/:senderId")
  @UseGuards(
    new AccessControlGuard(accessMatrix, "chat"),
    new SelfGuard("senderId", "id"),
  )
  @UseGuards(AuthGuard)
  getChatsBySender(@Param("senderId") senderId: number) {
    
    return this.chatService.getChatsBySender(senderId);
  }

  @ApiOperation({
    summary: "Get all chat messages for a specific chat",
    description: "Get all chat messages for a specific chat",
  })
  @ApiResponse({
    status: 200,
    description: "List of chat messages retrieved successfully",
  })
  @Get("chat/:chatId")
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  getAllChatsByChatId(@Param("chatId") chatId: number, @Req() req: Request) {
    const user = (req as any).user;
    return this.chatService.getAllChatsByChatId(chatId, user.id);
  }

  @ApiOperation({
    summary: "Create a new chat message",
    description: "Create a new chat message",
  })
  @ApiResponse({ status: 201, description: "Chat successfully created" })
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createChatDto: CreateChatPrivateDto) {
    return this.chatService.create(createChatDto);
  }

  @ApiOperation({
    summary: "Get all chat messages",
    description: "Get all chat message",
  })
  @ApiResponse({
    status: 200,
    description: "List of chats retrieved successfully",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.chatService.findAll();
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get a single chat message by ID",
    description: "Get a single chat message by ID",
  })
  @ApiResponse({
    status: 200,
    description: "Chat message retrieved successfully",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.chatService.findOne(+id);
    }
    return this.chatService.findOne(+id, user.id);
  }

  @ApiOperation({
    summary: "Update a chat message",
    description: "Update a chat message",
  })
  @ApiResponse({
    status: 200,
    description: "Chat message updated successfully",
  })
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateChatDto: UpdatePrivateChatDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.chatService.update(+id, updateChatDto);
    }
    return this.chatService.update(+id, updateChatDto, user.id);
  }

  @ApiOperation({
    summary: "Delete a chat message",
    description: "Delete a chat message by ID",
  })
  @ApiResponse({
    status: 200,
    description: "Chat message deleted successfully",
  })
  @Delete(":id")
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role === "admin" || user.role === "superadmin") {
      return this.chatService.remove(+id);
    }
    return this.chatService.remove(+id, user.id);
  }
}
