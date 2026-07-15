import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LogoutService } from '@/modules/auth/auth/services/logout.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  // SLA: FAST
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout — revokes refresh token' })
  // SLA: FAST
  async logout(@CurrentUser() user: any): Promise<{ message: string }> {
    return this.logoutService.logout(user.userId);
  }
}
