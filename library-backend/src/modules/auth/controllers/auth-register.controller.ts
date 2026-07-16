import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthRegisterService } from '@/modules/auth/services/auth-register.service';
import { AuthRegisterDto } from '@/modules/auth/dto/auth-register.dto';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthRegisterController {
  constructor(private readonly registerService: AuthRegisterService) {}

  // SLA: FAST
  @Post('signup')
  @UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
  @AuthRoles('superadmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a new user (superadmin only)' })
  // SLA: STANDARD
  async register(@Body() registerDto: AuthRegisterDto): Promise<any> {
    return this.registerService.register(registerDto);
  }
}
