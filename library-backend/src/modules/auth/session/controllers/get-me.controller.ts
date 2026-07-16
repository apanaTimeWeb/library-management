import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGetMeService } from '@/modules/auth/session/services/get-me.service';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthCurrentUser } from '@/modules/auth/session/decorators/auth-current-user.decorator';
import { AuthUserResponse } from '@/modules/auth/session/interfaces/auth.interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthGetMeController {
  constructor(private readonly getMeService: AuthGetMeService) {}

  // SLA: FAST
  @Get('me')
  @UseGuards(AuthJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current logged in user info' })
  // SLA: FAST
  async getMe(@AuthCurrentUser() user: any): Promise<AuthUserResponse> {
    return this.getMeService.getMe(user.userId);
  }
}
