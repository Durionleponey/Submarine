import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {UsersRepository} from "./users.repository";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput) {
    //console.log("frffrrfe", createUserInput);
    return this.userRepository.create({
      ...createUserInput,
      password: await bcrypt.hash(createUserInput.password, 10)//bcrypt is a library
    });
  }

  async findAll() {
    return this.userRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
