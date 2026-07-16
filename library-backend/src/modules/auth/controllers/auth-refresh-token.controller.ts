import {
  Controller,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthRefreshTokenService } from '@/modules/auth/services/auth-refresh-token.service';
import { AuthRefreshTokenGuard } from '@/modules/auth/guards/auth-refresh-token.guard';
import { AuthPublic } from '@/modules/auth/decorators/auth-public.decorator';
import { AuthTokens } from '@/modules/auth/interfaces/auth.interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthRefreshTokenController {
  constructor(private readonly refreshTokenService: AuthRefreshTokenService) {}

  // SLA: FAST
  @AuthPublic()
  @Post('refresh')
  @UseGuards(AuthRefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get new access token using refresh token' })
  // SLA: FAST
  async refresh(@Req() req: any): Promise<AuthTokens> {
    const userId = req.user.sub;
    const rawRefreshToken = req.user.refreshToken;
    return this.refreshTokenService.refreshTokens(userId, rawRefreshToken);
  }
}
