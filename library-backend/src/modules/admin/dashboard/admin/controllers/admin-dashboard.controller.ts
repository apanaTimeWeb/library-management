import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminDashboardService } from '@/modules/admin/admin-dashboard/admin/services/dashboard.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class AdminDashboardController {
  constructor(private readonly dashboardService: AdminDashboardService) {}

  // SLA: FAST
  @Get('dashboard')
  @ApiOperation({ summary: 'Admin dashboard data (admin + superadmin only)' })
  async getDashboardData(): Promise<any> {
    return this.dashboardService.getDashboardData();
  }
}
