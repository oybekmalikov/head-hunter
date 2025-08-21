import { PartialType } from "@nestjs/swagger";
import { CreateChatDto } from "./create-chats.dto";

export class UpdateChatDto extends PartialType(CreateChatDto) {}
