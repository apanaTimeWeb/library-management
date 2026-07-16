import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ExpenseCategoriesUpdateExpenseCategoryService } from '../services/update-expense-category.service';
import { ExpenseCategoriesUpdateExpenseCategoryDto } from '../dto/update-expense-category.dto';

@Controller('v1/admin/expense-categories')
export class ExpenseCategoriesUpdateExpenseCategoryController {
  constructor(private readonly service: ExpenseCategoriesUpdateExpenseCategoryService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: ExpenseCategoriesUpdateExpenseCategoryDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'ExpenseCategory updated successfully', data };
  }
}
