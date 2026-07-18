import { Controller, Get } from '@nestjs/common';
import { ExpensesGetAllExpensesService } from '../services/expenses-get-all-expenses.service';

@Controller('admin/accounting/expenses')
export class ExpensesGetAllExpensesController {
  constructor(private readonly service: ExpensesGetAllExpensesService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}