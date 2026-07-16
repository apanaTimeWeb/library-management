import { Controller, Get, Param } from '@nestjs/common';
import { GetExpenseCategoryService } from '../services/get-expense-category.service';

@Controller('api/v1/admin/expense-categories')
export class GetExpenseCategoryController {
  constructor(private readonly service: GetExpenseCategoryService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'ExpenseCategory retrieved successfully', data };
  }
}
