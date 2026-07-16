import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardCouponsService } from '@/modules/admin/dashboard-coupons/dashboard/services/coupons.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardCouponsController {
  constructor(private readonly couponsService: DashboardCouponsService) {}

  // SLA: FAST
  @Get('coupons')
  @ApiOperation({ summary: 'Get coupons' })
  async getCoupons(): Promise<any> {
    return this.couponsService.getCoupons();
  }
}
