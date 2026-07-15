import { Controller, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LogoutService } from '../services/logout.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout — revokes refresh token' })
  async logout(@CurrentUser() user: any) {
    return this.logoutService.logout(user.userId);
  }
}
