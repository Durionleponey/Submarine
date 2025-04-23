import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import {Message} from "./entities/message.entity";
import {Inject, UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/guards/gql-auth.guard";
import {CreateChatInput} from "../dto/create-chat.input";
import {CreateMessageInput} from "./dto/create-message.input";
import {CurrentUser} from "../../auth/current-user.decorator";
import {TokenPayload} from "../../auth/token-payload.interface";
import {query} from "express";
import {GetMessages} from "./dto/get-messages";
import {PubSub} from "graphql-subscriptions";
import {MessageCreatedArgs} from "../dto/message-created.args";

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService, @Inject('PUB_SUB') private readonly pubSub:PubSub) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
      @Args('createMessageInput') createMessageInput: CreateMessageInput,
      @CurrentUser() user:TokenPayload
  ) {
    console.log("hello from resolveur 🥳", createMessageInput);
    //console.log(user);
    return this.messagesService.createMessage(createMessageInput, user._id)
  }


  @Query(() => [Message])
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessageArgs: GetMessages,//defautl argument no name required
    @CurrentUser() user:TokenPayload
  ) {
    return this.messagesService.getMessages(getMessageArgs, user._id);
  }

  @Subscription(() => Message, {
    filter:(payload, variables) => {//payload --> in the message, variables --> graphQL request

      return payload.messageCreated.chatId === variables.chatId

    }
  })
  messageCreated(@Args()chatId:MessageCreatedArgs){

    console.log("yo")

    return this.pubSub.asyncIterableIterator('messageCreated');

  }


}

