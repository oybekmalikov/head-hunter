import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobApplicationsModule } from "../job-applications/job-applications.module";
import { UsersModule } from "../users/users.module";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { Chat } from "./entities/chat.entity";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    UsersModule,
    JobApplicationsModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
