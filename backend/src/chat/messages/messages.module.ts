import {forwardRef, Module} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import {ChatModule} from "../chat.module";

@Module({
  imports: [
      forwardRef(() => ChatModule),
  ],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
