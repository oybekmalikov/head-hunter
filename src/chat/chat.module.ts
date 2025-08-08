import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
// import { SenderModule } from "src/sender/sender.module";
// import { RecipientModule } from "src/recipient/recipient.module";
import { JobApplicationsModule } from "src/job-applications/job-applications.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    JobApplicationsModule
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule { }
