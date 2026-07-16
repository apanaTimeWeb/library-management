import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteExpenseCategoryService } from '../services/delete-expense-category.service';

@Controller('api/v1/admin/expense-categories')
export class DeleteExpenseCategoryController {
  constructor(private readonly service: DeleteExpenseCategoryService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'ExpenseCategory deleted successfully', data: null };
  }
}
