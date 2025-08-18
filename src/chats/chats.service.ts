import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateChatDto } from "./dto/create-chats.dto";
import { UpdateChatDto } from "./dto/update-chats.dto";
import { AllChats } from "./entities/chat.entity";

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(AllChats)
    private chatRepo: Repository<AllChats>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const savedChat = await this.chatRepo.save(createChatDto);
    return {
      message: "Chat created successfully",
      data: savedChat,
      success: true,
    };
  }

  async findAll() {
    const chats = await this.chatRepo.find({
      relations: ["user1", "user2", "jobApplication", "chats"],
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
    const chat = await this.chatRepo.findOne({
      where: { id },
      relations: ["user1", "user2", "jobApplication", "chats"],
    });
    if (!chat) {
      return {
        message: "Chat not found",
        success: false,
      };
    }
    if (userId && chat.userId1 !== userId && chat.userId2 !== userId && chat.isDeleted === false) {
      throw new ForbiddenException(
        "You are not authorized to access this chat",
      );
    }
    return {
      message: "Chat retrieved successfully",
      data: chat,
      success: true,
    };
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.chatRepo.findOne({
      where: { id },
    });
    if (!chat) {
      return {
        message: "Chat not found",
        success: false,
      };
    }
    await this.chatRepo.update(id, updateChatDto);
    return {
      message: updateChatDto.isDeleted ? "Chat deleted successfully" : "Chat updated successfully",
      data: updateChatDto.isDeleted ? { affected: 1 } : updateChatDto,
      success: true,
    };
  }

  async remove(id: number) {
    const chat = await this.chatRepo.findOne({
      where: { id },
    });
    if (!chat) {
      return {
        message: "Chat not found",
        success: false,
      };
    }
    await this.chatRepo.delete(id);
    return {
      message: "Chat deleted successfully",
      data: { affected: 1 },
      success: true,
    };
  }
  async findAllByUserId(userId: number) {
    const chats = await this.chatRepo
      .createQueryBuilder("chat")
      .leftJoinAndSelect("chat.user1", "user1")
      .leftJoinAndSelect("chat.user2", "user2")
      .leftJoinAndSelect("chat.jobApplication", "jobApplication")
      .leftJoinAndSelect("chat.chats", "chats")
      .where("chat.userId1 = :userId and chat.isDeleted = false", { userId })
      .orWhere("chat.userId2 = :userId and chat.isDeleted = false", { userId })
      .getMany();
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

  async findAllByUserIdAndArchived(userId: number) {
    const chats = await this.chatRepo.find({
      where: { userId1: userId, isArchived: true },
      relations: ["user1", "user2", "jobApplication", "chats"],
    });
    if (!chats || chats.length === 0) {
      return {
        message: "No chats found",
        success: false,
      };
    }
    return {
      message: "Archived chats retrieved successfully",
      data: chats,
      success: true,
    };
  }
}
