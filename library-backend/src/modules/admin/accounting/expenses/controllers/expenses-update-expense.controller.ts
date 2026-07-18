import { Controller, Patch } from '@nestjs/common';
import { ExpensesUpdateExpenseService } from '../services/expenses-update-expense.service';

@Controller('admin/accounting/expenses')
export class ExpensesUpdateExpenseController {
  constructor(private readonly service: ExpensesUpdateExpenseService) {}

  @Patch()
  async execute() {
    return this.service.execute();
  }
}