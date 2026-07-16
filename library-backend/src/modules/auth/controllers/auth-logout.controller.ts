import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthLogoutService } from '@/modules/auth/services/auth-logout.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthCurrentUser } from '../decorators/auth-current-user.decorator';

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
