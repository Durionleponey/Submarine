import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }


  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userMail' })
  findOneWithMail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findOneWithMail(email);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
<<<<<<< Updated upstream
  removeUser(@Args('id') id: string) {
=======
  @UseGuards(GqlAuthGuard)
  removeUser(
      //@Args('id') id: string,
      @CurrentUser() user: TokenPayload) {
    return this.usersService.remove(user._id);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() user: TokenPayload) {//getMe will return the current login user idk how it works but it works
    return user;
  }
/*
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, AdminGuard)
  removeUserAdmin(@Args('id') id: string) {
>>>>>>> Stashed changes
    return this.usersService.remove(id);
  }
}
