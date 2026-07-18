import { Controller, Get } from '@nestjs/common';
import { ExpensesGetExpenseService } from '../services/expenses-get-expense.service';

@Controller('admin/accounting/expenses')
export class ExpensesGetExpenseController {
  constructor(private readonly service: ExpensesGetExpenseService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}