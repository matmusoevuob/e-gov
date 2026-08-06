import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserProfileDto } from '../dto/user-profile.dto';

export const CurrentUser = createParamDecorator(
  (data: keyof UserProfileDto | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserProfileDto;

    return data ? user?.[data] : user;
  },
);
