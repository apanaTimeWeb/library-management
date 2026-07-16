import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateExpenseService } from '../services/update-expense.service';
import { UpdateExpenseDto } from '../dto/update-expense.dto';

@Controller('api/v1/manager/expenses')
export class UpdateExpenseController {
  constructor(private readonly service: UpdateExpenseService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Expense updated successfully', data };
  }
}
