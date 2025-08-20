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
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

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
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  getChatsBySender(@Param("senderId") senderId: number, @Req() req: Request) {
    const user = (req as any).user;
    if (senderId === user.id) {
      return this.chatService.getChatsBySender(senderId);
    }
    throw new ForbiddenException("Access denied");
  }

  @ApiOperation({
    summary: "Get all chat messages for a specific job application",
    description: "Get all chat messages for a specific job application",
  })
  @ApiResponse({
    status: 200,
    description: "List of chat messages retrieved successfully",
  })
  @Get("application/:applicationId")
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  getChatsByApplication(
    @Param("applicationId") applicationId: number,
    @Req() req: Request,
  ) {
    const user = (req as any).user;

    return this.chatService.getChatsByApplication(applicationId, user.id);
  }

  @ApiOperation({
    summary: "Get a single chat message by job posting ID",
    description: "Get a single chat message by job posting ID",
  })
  @ApiResponse({
    status: 200,
    description: "Chat message retrieved successfully",
  })
  @Get("job-posting/:jobPostingId")
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  getChatByJobPosting(
    @Param("jobPostingId") jobPostingId: number,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    return this.chatService.getChatByJobPosting(jobPostingId, user.id);
  }

  @ApiOperation({
    summary: "Create a new chat message",
    description: "Create a new chat message",
  })
  @ApiResponse({ status: 201, description: "Chat successfully created" })
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createChatDto: CreateChatDto) {
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
  @Patch(":id")
  @UseGuards(new AccessControlGuard(accessMatrix, "chat"))
  @UseGuards(AuthGuard)
  update(@Param("id") id: string, @Body() updateChatDto: UpdateChatDto, @Req() req: Request) {
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
