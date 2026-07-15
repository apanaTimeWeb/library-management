import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from '../services/dashboard.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { TenantGuard } from '../../../../auth/auth/guards/tenant.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';
import { CurrentUser } from '../../../../../common/decorators/current-user.decorator';

@ApiTags('Manager')
@ApiBearerAuth()
@Controller('api/manager/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('manager', 'admin', 'superadmin')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Manager dashboard (branch-scoped data only)' })
  async getDashboard(@CurrentUser() user: any) {
    return this.dashboardService.getDashboardData(user.branchId);
  }
}
