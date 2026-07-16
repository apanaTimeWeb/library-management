import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RegisterService } from '@/modules/auth/auth/services/register.service';
import { RegisterDto } from '@/modules/auth/auth/dto/register.dto';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Auth')
@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // SLA: FAST
  @Post('signup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superadmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a new user (superadmin only)' })
  // SLA: STANDARD
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.registerService.register(registerDto);
  }
}
