import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from "../chat.repository";
import { Chat } from "../entities/chat.entity";
import { CreateMessageInput } from "./dto/create-message.input";
import { Message } from "./entities/message.entity";
import { Types } from "mongoose";

@Injectable()
export class MessagesService {
    constructor(private readonly chatRepository: ChatRepository) {}

    async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
        const message: Message = {
            content,
            userId,
            createdAt: new Date(),
            _id: new Types.ObjectId(),
        };

        console.log(message)

        await this.chatRepository.findOneAndUpdate(
            {   //findOneAndUpdate take two argument, first is the filter and the second is the update
                //_id: chatId --> finding the correct chat to update
                _id: chatId,
                $or: [
                    { userId },
                    { userIds: { $in: [userId] } }
                ]
            },
            {
                $push: {
                    messages: message,
                }
            }
        );

        return message;
    }
}
