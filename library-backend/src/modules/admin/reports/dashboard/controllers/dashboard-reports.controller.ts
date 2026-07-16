import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardReportsService } from '@/modules/admin/dashboard-reports/dashboard/services/reports.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardReportsController {
  constructor(private readonly reportsService: DashboardReportsService) {}

  // SLA: FAST
  @Get('reports')
  @ApiOperation({ summary: 'Admin reports data (admin + superadmin only)' })
  async getReportsData(): Promise<any> {
    return this.reportsService.getReportsData();
  }
}
