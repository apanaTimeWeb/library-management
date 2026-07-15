import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllExpensesService } from '@/modules/manager/finance/expenses/services/get-all-expenses.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Finance Expenses')
@ApiBearerAuth()
@Controller('api/manager/expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetAllExpensesController {
  constructor(private readonly getAllExpensesService: GetAllExpensesService) {}

  // SLA: FAST
  @Get()
  @Roles('superadmin', 'admin', 'manager')
  @ApiOperation({ summary: 'Get all finance expenses (branch-scoped)' })
  async getAllExpenses(
    @Req() req: any,
    @Query() query: PaginationDto,
  ): Promise<any> {
    return this.getAllExpensesService.findAll(req.user?.branchId, query);
  }
}
