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
import {UsersRepository} from "../../users/users.repository";
import {response} from "express";

@Injectable()
export class MessagesService {
    constructor(private readonly chatRepository: ChatRepository, @Inject('PUB_SUB') private readonly pubSub:PubSub,private readonly usersRepository: UsersRepository) {}

    async createMessage({ content, chatId }: CreateMessageInput, userId: string) {


        const userPseudo = await this.usersRepository.findPseudoWithId({_id:userId});

        if (!userPseudo) {
            throw new Error("Impossible to math a email with UserId");
        }

        if (content.length < 1) {throw new Error("Message can't be empty");}
        if (content.length > 2000) {throw new Error("Message to long");}

        const views: string[] = [];

        const message: Message = {
            content,
            userId,
            userPseudo,
            chatId,
            views;
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

        const chat = await this.chatRepository.findOne({_id:chatId});
        if (!chat) return;

        if (chat.messages.length >= 50) {

            await this.chatRepository.findOneAndUpdate(
                {   //findOneAndUpdate take two argument, first is the filter and the second is the update
                    //_id: chatId --> finding the correct chat to update
                    _id: chatId,
                },
                {
                    $pop: {
                        messages: -1,
                    }
                }
            );
        }
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

    async viewMessage(messageId:string, userId:string, chatId:string) {
        try {
            await this.chatRepository.findOne(
                {   //findOneAndUpdate take two argument, first is the filter and the second is the update
                    //_id: chatId --> finding the correct chat to update
                    _id: chatId,
                    $or: [//a leaste one of the two condition shoud be true
                        { userId },
                        { userIds: { $in: [userId] } }
                    ]
                }
            )
        } catch { throw new Error("You don't have access to this chat!") }

        const userPseudo = await this.usersRepository.findPseudoWithId({_id:userId});
        console.log("--->", userPseudo);
        console.log("--->", messageId);

        try {
            const rep =  await this.chatRepository.findOneAndUpdate(
                {
                    _id: chatId,
                    messages: {
                        $elemMatch: {
                            _id: new Types.ObjectId(messageId),
                            views: { $ne: userPseudo }
                        }
                    }
                },
                {
                    $addToSet: { 'messages.$.views': userPseudo }
                },)

        } catch (e ){ throw new Error("Error viewing messages!") }
        return("succes!")
    }
}