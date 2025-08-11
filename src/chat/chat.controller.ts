import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new chat message', description: 'Create a new chat message'})
  @ApiResponse({ status: 201, description: 'Chat successfully created' })
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chat messages', description:'Get all chat message' })
  @ApiResponse({ status: 200, description: 'List of chats retrieved successfully' })
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single chat message by ID', description: 'Get a single chat message by ID'})
  @ApiResponse({ status: 200, description: 'Chat message retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a chat message', description: 'Update a chat message' })
  @ApiResponse({ status: 200, description: 'Chat message updated successfully' })
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a chat message',description:'Delete a chat message by ID' })
  @ApiResponse({ status: 200, description: 'Chat message deleted successfully' })
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
