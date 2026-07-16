import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * @AuthPublic() decorator
 * Mark a route as publicly accessible — skips AuthJwtAuthGuard.
 * Usage: @AuthPublic() on any controller method.
 * Example: @AuthPublic() @Get('health') getHealth() { ... }
 */
export const AuthPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
