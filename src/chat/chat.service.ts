import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateChatPrivateDto } from "./dto/create-chat.dto";
import { UpdatePrivateChatDto } from "./dto/update-chat.dto";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepo: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatPrivateDto) {
    const chat = this.chatRepo.create(createChatDto);
    const savedChat = await this.chatRepo.save(chat);
    return {
      message: "Chat created successfully",
      data: savedChat,
      success: true,
    };
  }
  async findAll() {
    const chats = await this.chatRepo.find({
      relations: [
        "allChats.user1",
        "allChats.user2",
        "allChats.jobApplication",
        "allChats",
      ],
    });
    if (!chats || chats.length === 0) {
      return {
        message: "No chats found",
        success: false,
      };
    }
    return {
      message: "Chats retrieved successfully",
      data: chats,
      success: true,
    };
  }
  async findOne(id: number, userId?: number) {
    const where = userId ? { id, sender: { id: userId } } : { id };
    const chat = await this.chatRepo.findOne({
      where,
      relations: [
        "allChats.user1",
        "allChats.user2",
        "allChats.jobApplication",
        "allChats",
      ],
    });
    if (!chat) {
      return {
        message: "Chat not found",
        success: false,
      };
    }
    return {
      message: "Chat retrieved successfully",
      data: chat,
      success: true,
    };
  }
  async update(id: number, updateChatDto: UpdatePrivateChatDto, userId?: number) {
    const where = userId ? { id, sender: { id: userId } } : { id };
    const updated = await this.chatRepo.preload({ ...where, ...updateChatDto });
    if (!updated) {
      return {
        message: "Chat not found",
        success: false,
      };
    }
    return {
      message: "Chat updated successfully",
      data: await this.chatRepo.save(updated),
      success: true,
    };
  }
  async remove(id: number, userId?: number) {
    if (userId) {
      const chat = await this.chatRepo.update(
        { id, senderId: userId },
        { isDeleted: true },
      );
      if (!chat) {
        return {
          message: "Chat not found",
          data: { affected: 1 },
          success: false,
        };
      }
      return {
        message: "Chat removed successfully",
        data: { affected: chat.affected },
        success: true,
      };
    }
    const chat = await this.chatRepo.delete({ id });
    if (!chat) {
      return {
        message: "Chat not found",
        succes: false,
      };
    }
    return {
      message: "Chat removed successfully",
      data: { affected: chat.affected },
      success: true,
    };
  }

  async getChatsBySender(senderId: number) {
    const chats = await this.chatRepo.find({
      where: { senderId: senderId },
      relations: [
        "allChats.user1",
        "allChats.user2",
        "allChats.jobApplication",
        "allChats",
      ],
    });
    if (!chats || chats.length === 0) {
      return {
        message: "No chats found",
        success: false,
      };
    }
    return {
      message: "Chats retrieved successfully",
      data: chats,
      success: true,
    };
  }

  async getAllChatsByChatId(chatId: number, userId: number) {
    const chats = await this.chatRepo.find({
      where: { chatId: chatId, senderId: userId },
      relations: [
        "allChats.user1",
        "allChats.user2",
        "allChats.jobApplication",
        "allChats",
      ],
    });
    if (!chats || chats.length === 0) {
      return {
        message: "No chats found",
        success: false,
      };
    }
    return {
      message: "Chats retrieved successfully",
      data: chats,
      success: true,
    };
  }
}
