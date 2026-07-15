import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BlacklistService } from '@/modules/admin/blacklist/dashboard/services/blacklist.service';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { TenantGuard } from '@/modules/auth/auth/guards/tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('superadmin', 'admin')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  // SLA: FAST
  @Get('blacklist')
  @ApiOperation({ summary: 'Get blacklist' })
  async getBlacklist(): Promise<any> {
    return this.blacklistService.getBlacklist();
  }
}
