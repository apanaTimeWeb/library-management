import { Controller, Delete, Param } from '@nestjs/common';
import { ExpensesDeleteExpenseService } from '../services/delete-expense.service';

@Controller('v1/admin/expenses')
export class ExpensesDeleteExpenseController {
  constructor(private readonly service: ExpensesDeleteExpenseService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Expense deleted successfully', data: null };
  }
}
