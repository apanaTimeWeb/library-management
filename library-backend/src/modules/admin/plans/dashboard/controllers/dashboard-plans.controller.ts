import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardPlansService } from '@/modules/admin/dashboard-plans/dashboard/services/plans.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardPlansController {
  constructor(private readonly plansService: DashboardPlansService) {}

  // SLA: FAST
  @Get('plans')
  @ApiOperation({ summary: 'Get plans' })
  async getPlans(): Promise<any[]> {
    return this.plansService.getPlans();
  }
}
