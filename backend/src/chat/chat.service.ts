import {Inject, Injectable, UseGuards} from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import {ChatRepository} from "./chat.repository";
import {GqlAuthGuard} from "../auth/guards/gql-auth.guard";
import {Chat} from "./entities/chat.entity";

@Injectable()
export class ChatService {

  constructor(private readonly chatRepository: ChatRepository) {} // i need a instance of chatRepostroy give it to me please





  async create(createChatInput: CreateChatInput, userId:string): Promise<Chat> {
    return this.chatRepository.create({...createChatInput, userId, userIds: createChatInput.userIds || []});
  }

  async findAll() {
    return this.chatRepository.find({});
  }

  async findOne(_id: string) {
    return this.chatRepository.findOne({_id});
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
