import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GetAllExpensesService } from '../services/get-all-expenses.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interfaces/pagination.interface';
import { ExpenseResponse } from '../interfaces/expenses.interfaces';

@ApiTags('Superadmin Finance Expenses')
@ApiBearerAuth()
@Controller('api/superadmin/expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllExpensesController {
  constructor(private readonly service: GetAllExpensesService) {}

  // SLA: FAST
  @Get()
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Get all expenses' })
  async getAllExpenses(
    @Req() req: any,
    @Query() query: PaginationDto
  ): Promise<PaginatedResponse<ExpenseResponse>> {
    return this.service.findAll(req.user.branchId, query);
  }
}
