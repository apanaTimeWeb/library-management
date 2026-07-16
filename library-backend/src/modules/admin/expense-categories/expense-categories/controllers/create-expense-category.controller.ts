import { Controller, Post, Body } from '@nestjs/common';
import { CreateExpenseCategoryService } from '../services/create-expense-category.service';
import { CreateExpenseCategoryDto } from '../dto/create-expense-category.dto';

@Controller('api/v1/admin/expense-categories')
export class CreateExpenseCategoryController {
  constructor(private readonly service: CreateExpenseCategoryService) {}

  @Post()
  async handle(@Body() dto: CreateExpenseCategoryDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'ExpenseCategory created successfully', data };
  }
}
