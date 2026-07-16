import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardExpensesService } from '@/modules/admin/dashboard-expenses/dashboard/services/expenses.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
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
