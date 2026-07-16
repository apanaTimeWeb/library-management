import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthLogoutService } from '@/modules/auth/session/services/logout.service';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthCurrentUser } from '@/modules/auth/session/decorators/auth-current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthLogoutController {
  constructor(private readonly logoutService: AuthLogoutService) {}

  // SLA: FAST
  @Post('logout')
  @UseGuards(AuthJwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout — revokes refresh token' })
  // SLA: FAST
  async logout(@AuthCurrentUser() user: any): Promise<{ message: string }> {
    return this.logoutService.logout(user.userId);
  }
}
