import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardBranchesService } from '@/modules/admin/dashboard-branches/dashboard/services/branches.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardBranchesController {
  constructor(private readonly branchesService: DashboardBranchesService) {}

  // SLA: FAST
  @Get('branches')
  @ApiOperation({ summary: 'Get branches' })
  async getBranches(): Promise<any[]> {
    return this.branchesService.getBranches();
  }
}
