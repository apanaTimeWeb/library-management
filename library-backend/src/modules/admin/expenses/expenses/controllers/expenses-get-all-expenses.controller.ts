import { Controller, Get, Query } from '@nestjs/common';
import { ExpensesGetAllService } from '../services/expenses-get-all-expenses.service';
import { ExpensesGetExpensesQueryDto } from '../dto/expenses-get-expenses-query.dto';

@Controller('v1/admin/expenses')
export class ExpensesGetAllController {
  constructor(private readonly service: ExpensesGetAllService) {}

  @Get()
  async handle(@Query() query: ExpensesGetExpensesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Expenses retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
