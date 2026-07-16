import { Controller, Get, Query } from '@nestjs/common';
import { GetAllExpenseCategoriesService } from '../services/get-all-expense-categories.service';
import { GetExpenseCategoriesQueryDto } from '../dto/get-expense-categories-query.dto';

@Controller('api/v1/admin/expense-categories')
export class GetAllExpenseCategoriesController {
  constructor(private readonly service: GetAllExpenseCategoriesService) {}

  @Get()
  async handle(@Query() query: GetExpenseCategoriesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'ExpenseCategories retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
