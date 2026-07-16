import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResetPasswordService } from '../services/reset-password.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  // SLA: FAST
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using OTP' })
  // SLA: FAST
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.resetPasswordService.resetPassword(resetPasswordDto);
  }
}
