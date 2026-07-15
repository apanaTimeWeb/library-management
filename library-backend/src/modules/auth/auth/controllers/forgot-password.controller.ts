import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

@ApiTags('Auth')
@Controller('api/auth/auth')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request a password reset OTP' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.forgotPasswordService.processForgotPassword(forgotPasswordDto);
  }
}
