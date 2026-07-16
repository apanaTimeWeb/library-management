import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { ExpensesCreateService } from '@/modules/manager/finance/expenses/services/expenses-create.service';
import { CreateExpenseDto } from '@/modules/manager/finance/expenses/dto/create-expense.dto';

@ApiTags('Expenses')
@Controller('api/v1/manager/expenses')
export class ExpensesCreateController {
  constructor(private readonly service: ExpensesCreateService) {}

  @Post()
  async handle(@Body() dto: CreateExpenseDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
