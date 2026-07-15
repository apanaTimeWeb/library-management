import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from '@/modules/manager/reports/dashboard/services/reports.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { TenantGuard } from '@/modules/auth/auth/guards/tenant.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('manager', 'admin', 'superadmin')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('reports')
  @ApiOperation({ summary: 'Manager reports' })
  async getReports() {
    return this.reportsService.getReportsData();
  }
}
