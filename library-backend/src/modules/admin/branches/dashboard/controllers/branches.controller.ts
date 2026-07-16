import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BranchesService } from '@/modules/admin/branches/dashboard/services/branches.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  // SLA: FAST
  @Get('branches')
  @ApiOperation({ summary: 'Get branches' })
  async getBranches(): Promise<any[]> {
    return this.branchesService.getBranches();
  }
}
