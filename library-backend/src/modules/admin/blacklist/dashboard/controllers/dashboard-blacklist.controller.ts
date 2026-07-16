import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardBlacklistService } from '@/modules/admin/dashboard-blacklist/dashboard/services/blacklist.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardBlacklistController {
  constructor(private readonly blacklistService: DashboardBlacklistService) {}

  // SLA: FAST
  @Get('blacklist')
  @ApiOperation({ summary: 'Get blacklist' })
  async getBlacklist(): Promise<any> {
    return this.blacklistService.getBlacklist();
  }
}
