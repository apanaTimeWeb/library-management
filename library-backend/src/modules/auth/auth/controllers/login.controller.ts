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
import { LoginService } from '@/modules/auth/auth/services/login.service';
import { LoginDto } from '@/modules/auth/auth/dto/login.dto';
import { Public } from '@/modules/auth/auth/decorators/public.decorator';
import { LoginResponse } from '@/modules/auth/auth/interfaces/auth.interfaces';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
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
    @Body() loginDto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<LoginResponse> {
    return this.loginService.login(loginDto, ip, userAgent || 'unknown');
  }
}
