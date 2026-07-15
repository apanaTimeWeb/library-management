import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ExpenseCategoriesService } from '../services/expense-categories.service';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { TenantGuard } from '../../../../auth/auth/guards/tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('superadmin', 'admin')
export class ExpenseCategoriesController {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) {}

  @Get('expense-categories')
  @ApiOperation({ summary: 'Get expense categories' })
  async getExpenseCategories(): Promise<any> {
    return this.expenseCategoriesService.getExpenseCategories();
  }
}
