import {forwardRef, Module} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import {ChatRepository} from "./chat.repository";
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.entity';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema }
    ]),

    forwardRef(() => MessagesModule),
  ],
  providers: [ChatResolver, ChatService, ChatRepository],
  exports: [ChatRepository],
})
export class ChatModule {}
