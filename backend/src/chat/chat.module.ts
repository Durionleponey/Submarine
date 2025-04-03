import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import {ChatRepository} from "./chat.repository";
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.entity';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema }
    ])
  ],
  providers: [ChatResolver, ChatService, ChatRepository],
})
export class ChatModule {}
