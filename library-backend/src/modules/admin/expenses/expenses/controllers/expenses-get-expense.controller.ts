import { Controller, Get, Param } from '@nestjs/common';
import { ExpensesGetExpenseService } from '../services/get-expense.service';

@Controller('v1/admin/expenses')
export class ExpensesGetExpenseController {
  constructor(private readonly service: ExpensesGetExpenseService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Expense retrieved successfully', data };
  }
}
