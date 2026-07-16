import { Controller, Post, Body } from '@nestjs/common';
import { ExpenseCategoriesCreateExpenseCategoryService } from '../services/create-expense-category.service';
import { ExpenseCategoriesCreateExpenseCategoryDto } from '../dto/create-expense-category.dto';

@Controller('v1/admin/expense-categories')
export class ExpenseCategoriesCreateExpenseCategoryController {
  constructor(private readonly service: ExpenseCategoriesCreateExpenseCategoryService) {}

  @Post()
  async handle(@Body() dto: ExpenseCategoriesCreateExpenseCategoryDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'ExpenseCategory created successfully', data };
  }
}
