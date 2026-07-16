import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardExpenseCategoriesService } from '@/modules/admin/dashboard-expense-categories/dashboard/services/expense-categories.service';
import { AuthRoles } from '@/modules/auth/decorators/auth-roles.decorator';
import { AuthJwtAuthGuard } from '@/modules/auth/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/guards/auth-roles.guard';
import { AuthTenantGuard } from '@/modules/auth/guards/auth-tenant.guard';

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
