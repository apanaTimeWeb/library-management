import { Controller, Get, Query } from '@nestjs/common';
import { ExpenseCategoriesGetAllService } from '../services/expense-categories-get-all-expense-categories.service';
import { ExpenseCategoriesGetExpenseCategoriesQueryDto } from '../dto/expense-categories-get-expense-categories-query.dto';

@Controller('v1/admin/expense-categories')
export class ExpenseCategoriesGetAllController {
  constructor(private readonly service: ExpenseCategoriesGetAllService) {}

  @Get()
  async handle(@Query() query: ExpenseCategoriesGetExpenseCategoriesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'ExpenseCategories retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
