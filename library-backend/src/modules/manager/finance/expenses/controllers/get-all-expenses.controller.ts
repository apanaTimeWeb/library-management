import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllExpensesService } from '../services/get-all-expenses.service';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';

@ApiTags('Finance Expenses')
@ApiBearerAuth()
@Controller('api/manager/expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllExpensesController {
  constructor(private readonly getAllExpensesService: GetAllExpensesService) {}

  @Get()
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Get all finance expenses (branch-scoped)' })
  async getAllExpenses(@Req() req: any) {
    return this.getAllExpensesService.findAll(req.user?.branchId);
  }
}
