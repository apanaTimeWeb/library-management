import {
  Controller,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RefreshTokenService } from '@/modules/auth/auth/services/refresh-token.service';
import { RefreshTokenGuard } from '@/modules/auth/auth/guards/refresh-token.guard';
import { Public } from '@/modules/auth/auth/decorators/public.decorator';
import { AuthTokens } from '@/modules/auth/auth/interfaces/auth.interfaces';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Public()
  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get new access token using refresh token' })
  // SLA: FAST
  async refresh(@Req() req: any): Promise<AuthTokens> {
    const userId = req.user.sub;
    const rawRefreshToken = req.user.refreshToken;
    return this.refreshTokenService.refreshTokens(userId, rawRefreshToken);
  }
}
