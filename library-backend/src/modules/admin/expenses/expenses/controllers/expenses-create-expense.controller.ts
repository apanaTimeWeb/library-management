import { Controller, Post, Body } from '@nestjs/common';
import { ExpensesCreateExpenseService } from '../services/create-expense.service';
import { ExpensesCreateExpenseDto } from '../dto/create-expense.dto';

@Controller('api/v1/admin/expenses')
export class ExpensesCreateExpenseController {
  constructor(private readonly service: ExpensesCreateExpenseService) {}

  @Post()
  async handle(@Body() dto: ExpensesCreateExpenseDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Expense created successfully', data };
  }
}
