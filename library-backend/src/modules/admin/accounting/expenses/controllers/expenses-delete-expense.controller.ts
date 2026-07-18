import { Controller, Delete } from '@nestjs/common';
import { ExpensesDeleteExpenseService } from '../services/expenses-delete-expense.service';

@Controller('admin/accounting/expenses')
export class ExpensesDeleteExpenseController {
  constructor(private readonly service: ExpensesDeleteExpenseService) {}

  @Delete()
  async execute() {
    return this.service.execute();
  }
}