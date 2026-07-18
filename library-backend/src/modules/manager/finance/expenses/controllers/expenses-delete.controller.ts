import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { ExpensesDeleteService } from '@/modules/manager/finance/expenses/services/expenses-delete.service';

@ApiTags('Expenses')
@Controller('api/v1/manager/expenses')
export class ExpensesDeleteController {
  constructor(private readonly service: ExpensesDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
