import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardReportsService } from '@/modules/manager/reports/dashboard/services/dashboard-reports.service';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/session/guards/auth-tenant.guard';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('manager', 'admin', 'superadmin')
export class DashboardReportsController {
  constructor(private readonly reportsService: DashboardReportsService) {}

  // SLA: FAST
  @Get('reports')
  @ApiOperation({ summary: 'Manager reports' })
  async getReports(): Promise<any> {
    return this.reportsService.getReportsData();
  }
}
