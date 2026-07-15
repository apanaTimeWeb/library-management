import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from '@/modules/superadmin/dashboard/superadmin/services/dashboard.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Superadmin Dashboard')
@ApiBearerAuth()
@Controller('api/superadmin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // SLA: FAST
  @Get('dashboard')
  @ApiOperation({ summary: 'Superadmin dashboard KPIs and system overview' })
  async getDashboard(): Promise<any> {
    return await this.dashboardService.getDashboardData();
  }
}
