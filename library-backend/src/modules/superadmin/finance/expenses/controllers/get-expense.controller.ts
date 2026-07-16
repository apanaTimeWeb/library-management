import { Controller, Get, Param } from '@nestjs/common';
import { GetExpenseService } from '../services/get-expense.service';

@Controller('api/v1/superadmin/expenses')
export class GetExpenseController {
  constructor(private readonly service: GetExpenseService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Expense retrieved successfully', data };
  }
}
