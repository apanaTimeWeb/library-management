import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ExpensesUpdateExpenseService } from '../services/update-expense.service';
import { ExpensesUpdateExpenseDto } from '../dto/update-expense.dto';

@Controller('v1/admin/expenses')
export class ExpensesUpdateExpenseController {
  constructor(private readonly service: ExpensesUpdateExpenseService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: ExpensesUpdateExpenseDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Expense updated successfully', data };
  }
}
