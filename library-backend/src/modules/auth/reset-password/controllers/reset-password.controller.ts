import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthResetPasswordService } from '@/modules/auth/reset-password/services/reset-password.service';
import { AuthResetPasswordDto } from '@/modules/auth/reset-password/dto/auth-reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthResetPasswordController {
  constructor(private readonly resetPasswordService: AuthResetPasswordService) {}

  // SLA: FAST
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using OTP' })
  // SLA: FAST
  async resetPassword(
    @Body() resetPasswordDto: AuthResetPasswordDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.resetPasswordService.resetPassword(resetPasswordDto);
  }
}
