import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthForgotPasswordService } from '../services/auth-forgot-password.service';
import { AuthForgotPasswordDto } from '../dto/auth-forgot-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthForgotPasswordController {
  constructor(private readonly forgotPasswordService: AuthForgotPasswordService) {}

  // SLA: FAST
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request a password reset OTP' })
  // SLA: FAST
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.forgotPasswordService.processForgotPassword(forgotPasswordDto);
  }
}
