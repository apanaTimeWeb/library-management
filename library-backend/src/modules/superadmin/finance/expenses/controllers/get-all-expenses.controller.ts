import { Controller, Get, Query } from '@nestjs/common';
import { GetAllExpensesService } from '../services/get-all-expenses.service';
import { GetExpensesQueryDto } from '../dto/get-expenses-query.dto';

@Controller('api/v1/superadmin/expenses')
export class GetAllExpensesController {
  constructor(private readonly service: GetAllExpensesService) {}

  @Get()
  async handle(@Query() query: GetExpensesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Expenses retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
