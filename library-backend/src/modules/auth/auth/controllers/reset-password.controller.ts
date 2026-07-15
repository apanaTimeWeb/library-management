import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResetPasswordService } from '../services/reset-password.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using OTP' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordService.resetPassword(resetPasswordDto);
  }
}
