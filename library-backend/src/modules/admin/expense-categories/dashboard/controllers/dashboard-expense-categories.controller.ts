import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardExpenseCategoriesService } from '@/modules/admin/expense-categories/dashboard/services/dashboard-expense-categories.service';
import { AuthRoles } from '@/modules/auth/session/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/session/guards/auth-tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin/dashboard')
@UseGuards(AuthJwtAuthGuard, AuthRolesGuard, AuthTenantGuard)
@AuthRoles('superadmin', 'admin')
export class DashboardExpenseCategoriesController {
  constructor(
    private readonly expenseCategoriesService: DashboardExpenseCategoriesService,
  ) {}

  // SLA: FAST
  @Get('expense-categories')
  @ApiOperation({ summary: 'Get expense categories' })
  async getExpenseCategories(): Promise<any> {
    return this.expenseCategoriesService.getExpenseCategories();
  }
}
