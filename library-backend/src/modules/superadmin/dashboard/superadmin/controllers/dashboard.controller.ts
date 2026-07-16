import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from '@/modules/superadmin/dashboard/superadmin/services/dashboard.service';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard)
@AuthRoles('superadmin')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // SLA: FAST
  @Get('dashboard')
  @ApiOperation({ summary: 'Superadmin dashboard KPIs and system overview' })
  async getDashboard(): Promise<any> {
    return await this.dashboardService.getDashboardData();
  }
}
