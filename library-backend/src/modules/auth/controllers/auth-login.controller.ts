import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Ip,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthLoginService } from '@/modules/auth/services/auth-login.service';
import { AuthLoginDto } from '@/modules/auth/dto/auth-login.dto';
import { AuthPublic } from '@/modules/auth/decorators/auth-public.decorator';
import { LoginResponse } from '@/modules/auth/interfaces/auth.interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthLoginController {
  constructor(private readonly loginService: AuthLoginService) {}

  // SLA: FAST
  @AuthPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Login with phone and password' })
  @ApiResponse({ status: 200, description: 'Returns access + refresh tokens' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 403, description: 'Account locked' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  // SLA: FAST
  async login(
    @Body() loginDto: AuthLoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<LoginResponse> {
    return this.loginService.login(loginDto, ip, userAgent || 'unknown');
  }
}
