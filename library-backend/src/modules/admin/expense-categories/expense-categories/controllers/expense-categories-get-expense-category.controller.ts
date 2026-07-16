import { Controller, Get, Param } from '@nestjs/common';
import { ExpenseCategoriesGetExpenseCategoryService } from '../services/get-expense-category.service';

@Controller('v1/admin/expense-categories')
export class ExpenseCategoriesGetExpenseCategoryController {
  constructor(private readonly service: ExpenseCategoriesGetExpenseCategoryService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'ExpenseCategory retrieved successfully', data };
  }
}
