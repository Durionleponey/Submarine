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
      password: await this.hashPassword(createUserInput.password)
    });
  }

  private async hashPassword(password:string){//bcrypt is a library
    return bcrypt.hash(password, 10)
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

  async update(_id: string, updateUserInput: UpdateUserInput) {
    return this.userRepository.findOneAndUpdate({ _id:_id}, {
      $set:{
        ...updateUserInput,
        password:await this.hashPassword(<string>updateUserInput.password)

      }
    })
  }

  async remove(_id: string) {
    return this.userRepository.findOneAndDelete({_id})//in fact here '_id:_id' or '_id' i'ts the same because there are the same but is faster to type '_id'
  }
}
