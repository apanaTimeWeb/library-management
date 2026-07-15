import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from '@/modules/manager/dashboard/manager/services/dashboard.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { TenantGuard } from '@/modules/auth/auth/guards/tenant.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('manager', 'admin', 'superadmin')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // SLA: FAST
  @Get('dashboard')
  @ApiOperation({ summary: 'Manager dashboard (branch-scoped data only)' })
  async getDashboard(@CurrentUser() user: any): Promise<any> {
    return this.dashboardService.getDashboardData(user.branchId);
  }
}
