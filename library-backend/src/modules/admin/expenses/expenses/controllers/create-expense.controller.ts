import { Controller, Post, Body } from '@nestjs/common';
import { CreateExpenseService } from '../services/create-expense.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';

@Controller('api/v1/admin/expenses')
export class CreateExpenseController {
  constructor(private readonly service: CreateExpenseService) {}

  @Post()
  async handle(@Body() dto: CreateExpenseDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Expense created successfully', data };
  }
}
