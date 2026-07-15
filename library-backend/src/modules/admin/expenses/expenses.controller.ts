import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/auth/guards/roles.guard';
import { Roles } from '../../auth/auth/decorators/roles.decorator';

@Controller('api/admin/expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminExpensesController {
  constructor(private readonly expensesService: AdminExpensesService) {}

  @Get()
  @Roles('superadmin', 'admin', 'manager')
  async getAllExpenses(@Req() req: any) {
    // If manager is assigned to a branch, restrict to branchId
    return this.expensesService.findAll(req.user.branchId);
  }
}
