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

  async findOne(id: string) {//mongo db's _id can be search as a string apparently
    return this.userRepository.findOne({ _id:id});
  }

  async findOneWithMail(mail: string) {//useless but i want to exercice
    return this.userRepository.findOne({ email:mail});
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
