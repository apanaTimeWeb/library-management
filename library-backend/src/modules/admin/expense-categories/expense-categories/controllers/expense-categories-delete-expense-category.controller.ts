import { Controller, Delete, Param } from '@nestjs/common';
import { ExpenseCategoriesDeleteExpenseCategoryService } from '../services/expense-categories-delete-expense-category.service';

@Controller('v1/admin/expense-categories')
export class ExpenseCategoriesDeleteExpenseCategoryController {
  constructor(private readonly service: ExpenseCategoriesDeleteExpenseCategoryService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'ExpenseCategory deleted successfully', data: null };
  }
}
