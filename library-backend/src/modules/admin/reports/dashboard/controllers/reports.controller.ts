import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from '@/modules/admin/reports/dashboard/services/reports.service';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { TenantGuard } from '@/modules/auth/auth/guards/tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('superadmin', 'admin')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // SLA: FAST
  @Get('reports')
  @ApiOperation({ summary: 'Admin reports data (admin + superadmin only)' })
  async getReportsData(): Promise<any> {
    return this.reportsService.getReportsData();
  }
}
