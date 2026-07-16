import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from '@/modules/manager/dashboard/manager/services/dashboard.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('manager', 'admin', 'superadmin')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // SLA: FAST
  @Get('dashboard')
  @ApiOperation({ summary: 'Manager dashboard (branch-scoped data only)' })
  async getDashboard(@CurrentUser() user: any): Promise<any> {
    return this.dashboardService.getDashboardData(user.branchId);
  }
}
