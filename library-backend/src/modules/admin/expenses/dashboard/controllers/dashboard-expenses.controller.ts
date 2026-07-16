import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardExpensesService } from '@/modules/admin/dashboard-expenses/dashboard/services/expenses.service';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/session/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardExpensesController {
  constructor(private readonly expensesService: DashboardExpensesService) {}

  // SLA: FAST
  @Get('expenses')
  @ApiOperation({ summary: 'Get expenses' })
  async getExpenses(): Promise<any> {
    return this.expensesService.getExpenses();
  }
}
