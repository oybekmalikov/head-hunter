import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllChats } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AllChats])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
