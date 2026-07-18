import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { ExpensesGetService } from '@/modules/manager/finance/expenses/services/expenses-get.service';

@ApiTags('Expenses')
@Controller('api/v1/manager/expenses')
export class ExpensesGetController {
  constructor(private readonly service: ExpensesGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
