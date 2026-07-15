import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetMeService } from '@/modules/auth/auth/services/get-me.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { AuthUserResponse } from '@/modules/auth/auth/interfaces/auth.interfaces';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class GetMeController {
  constructor(private readonly getMeService: GetMeService) {}

  // SLA: FAST
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current logged in user info' })
  // SLA: FAST
  async getMe(@CurrentUser() user: any): Promise<AuthUserResponse> {
    return this.getMeService.getMe(user.userId);
  }
}
