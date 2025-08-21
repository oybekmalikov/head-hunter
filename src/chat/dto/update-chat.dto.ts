import { PartialType } from "@nestjs/swagger";
import { CreateChatPrivateDto } from "./create-chat.dto";

export class UpdatePrivateChatDto extends PartialType(CreateChatPrivateDto) {}
