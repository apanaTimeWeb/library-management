import { Controller, Post } from '@nestjs/common';
import { ExpensesCreateExpenseService } from '../services/expenses-create-expense.service';

@Controller('admin/accounting/expenses')
export class ExpensesCreateExpenseController {
  constructor(private readonly service: ExpensesCreateExpenseService) {}

  @Post()
  async execute() {
    return this.service.execute();
  }
}