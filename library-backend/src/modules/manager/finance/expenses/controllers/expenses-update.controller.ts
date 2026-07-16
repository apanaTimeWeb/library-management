import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ExpensesUpdateService } from '@/modules/manager/finance/expenses/services/expenses-update.service';
import { UpdateExpenseDto } from '@/modules/manager/finance/expenses/dto/update-expense.dto';

@ApiTags('Expenses')
@Controller('api/v1/manager/expenses')
export class ExpensesUpdateController {
  constructor(private readonly service: ExpensesUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
