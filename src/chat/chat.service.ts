import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobApplicationsService } from "../job-applications/job-applications.service";
import { UsersService } from "../users/users.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepo: Repository<Chat>,
    private jobApplicationsService: JobApplicationsService,
    private senderService: UsersService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const jobApplication = await this.jobApplicationsService.findOne(
      createChatDto.applicationId,
    );
    const sender = await this.senderService.findOne(createChatDto.senderId);
    if (!jobApplication) {
      throw new NotFoundException("Job application not found");
    }
    if (!sender) {
      throw new NotFoundException("Sender not found");
    }
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
      relations: ["jobApplication", "sender", "recipient"],
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
  async findOne(id: number) {
    const chat = await this.chatRepo.findOne({
      where: { id },
      relations: ["jobApplication", "sender", "recipient"],
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
  async update(id: number, updateChatDto: UpdateChatDto) {
    const updated = await this.chatRepo.preload({ id, ...updateChatDto });
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
  async remove(id: number) {
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
}
