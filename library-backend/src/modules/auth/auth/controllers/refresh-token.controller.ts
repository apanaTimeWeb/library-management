import { Controller, Post, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RefreshTokenService } from '../services/refresh-token.service';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { Public } from '../decorators/public.decorator';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Public()
  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get new access token using refresh token' })
  async refresh(@Req() req: any) {
    const userId = req.user.sub;
    const rawRefreshToken = req.user.refreshToken;
    return this.refreshTokenService.refreshTokens(userId, rawRefreshToken);
  }
}
