import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @AuthCurrentUser() decorator
 * Extracts the authenticated user from the JWT payload attached by AuthJwtAuthGuard.
 * Usage: async myEndpoint(@AuthCurrentUser() user: JwtPayload) { ... }
 */
export const AuthCurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
