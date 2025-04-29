import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from "../chat.repository";
import { Chat } from "../entities/chat.entity";
import { CreateMessageInput } from "./dto/create-message.input";
import { Message } from "./entities/message.entity";
import { Types } from "mongoose";
import {GetMessages} from "./dto/get-messages";
import {PubSub} from "graphql-subscriptions";
import {string} from "joi";
import {MessageCreatedArgs} from "../dto/message-created.args";

@Injectable()
export class MessagesService {
    constructor(private readonly chatRepository: ChatRepository, @Inject('PUB_SUB') private readonly pubSub:PubSub) {}

    async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
        const message: Message = {
            content,
            userId,
            chatId,
            createdAt: new Date(),
            _id: new Types.ObjectId(),
        };

        console.log(message)

        await this.chatRepository.findOneAndUpdate(
            {   //findOneAndUpdate take two argument, first is the filter and the second is the update
                //_id: chatId --> finding the correct chat to update
                _id: chatId,
                $or: [//a leaste one of the two condition shoud be true
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

        console.log("--->", message)


/*        await this.pubSub.publish('messageCreated', {
            messageCreated: 'pommes de terre'
        })*/

        await this.pubSub.publish('messageCreated', {
            messageCreated: message
        })


        return message;
    }

    async getMessages({chatId}:GetMessages, userId:string){

        let messages

        try {

            messages = (
                await this.chatRepository.findOne(
                    {   //findOneAndUpdate take two argument, first is the filter and the second is the update
                        //_id: chatId --> finding the correct chat to update
                        _id: chatId,
                        $or: [//a leaste one of the two condition shoud be true
                            { userId },
                            { userIds: { $in: [userId] } }
                        ]
                    })
            )


        }catch (err){
            throw new Error('Error getting messages!, do you have the acces to this chat ?');
        }

        return messages.messages;

    }


    async messageCreated({chatId}: MessageCreatedArgs, userId:string) {

        await this.chatRepository.findOne(
            {   //findOneAndUpdate take two argument, first is the filter and the second is the update
                //_id: chatId --> finding the correct chat to update
                _id: chatId,
                $or: [//a leaste one of the two condition shoud be true
                    { userId },
                    { userIds: { $in: [userId] } }
                ]
            })
        return this.pubSub.asyncIterableIterator('messageCreated');

    }
}
