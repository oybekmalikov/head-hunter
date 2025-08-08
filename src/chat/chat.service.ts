import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";
import { Repository } from "typeorm";
import { JobApplicationsService } from "../job-applications/job-applications.service";
// import { SenderService } from "../sender/sender.service";
// import { RecipientService } from "../recipient/recipient.service";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepo: Repository<Chat>,
    private jobApplicationsService: JobApplicationsService,
    // private senderService: SenderService,
    // private recipientService: RecipientService
  ) {}

  async create(createChatDto: CreateChatDto) {
    const jobApplication = await this.jobApplicationsService.findOne(
      createChatDto.application_id
    );
    // const sender = await this.senderService.findOne(createChatDto.sender_id);

    if (!jobApplication) {
      throw new NotFoundException("Job application not found");
    }
    // if (!sender) {
    //   throw new NotFoundException("Sender not found");
    // }

    const chat = this.chatRepo.create(createChatDto);
    const savedChat = await this.chatRepo.save(chat);

    return {
      message: "Chat created successfully",
      data: savedChat,
      success: true,
    };
  }

  async findAll() {
    const chats = await this.chatRepo.find();
    return {
      message: "Chats retrieved successfully",
      data: chats,
      success: true,
    };
  }

  async findOne(id: number) {
    const chat = await this.chatRepo.findOne({ where: { id } });
    if (!chat) {
      throw new NotFoundException("Chat not found");
    }
    return {
      message: "Chat retrieved successfully",
      data: chat,
      success: true,
    };
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.chatRepo.findOne({ where: { id } });
    if (!chat) {
      throw new NotFoundException("Chat not found");
    }

    const updated = await this.chatRepo.save({ ...chat, ...updateChatDto });

    return {
      message: "Chat updated successfully",
      data: updated,
      success: true,
    };
  }

  async remove(id: number) {
    const chat = await this.chatRepo.findOne({ where: { id } });
    if (!chat) {
      throw new NotFoundException("Chat not found");
    }

    await this.chatRepo.remove(chat);

    return {
      message: "Chat removed successfully",
      success: true,
    };
  }
}
