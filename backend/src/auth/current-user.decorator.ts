import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): User => {//this decorator allow to retriv user data form a http request
    return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(//this code convert getCurrent... to a decorator
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context),
);
