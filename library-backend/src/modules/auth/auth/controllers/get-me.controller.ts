import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetMeService } from '../services/get-me.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class GetMeController {
  constructor(private readonly getMeService: GetMeService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current logged in user info' })
  async getMe(@CurrentUser() user: any) {
    return this.getMeService.getMe(user.userId);
  }
}
