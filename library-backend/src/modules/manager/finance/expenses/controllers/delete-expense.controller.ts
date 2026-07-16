import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteExpenseService } from '../services/delete-expense.service';

@Controller('api/v1/manager/expenses')
export class DeleteExpenseController {
  constructor(private readonly service: DeleteExpenseService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Expense deleted successfully', data: null };
  }
}
