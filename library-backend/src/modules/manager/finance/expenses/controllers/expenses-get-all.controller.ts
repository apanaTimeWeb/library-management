import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { ExpensesGetAllService } from '@/modules/manager/finance/expenses/services/expenses-get-all.service';
import { GetExpensesQueryDto } from '@/modules/manager/finance/expenses/dto/get-expenses-query.dto';

@ApiTags('Expenses')
@Controller('api/v1/manager/expenses')
export class ExpensesGetAllController {
  constructor(private readonly service: ExpensesGetAllService) {}

  @Get()
  async handle(@Query() query: GetExpensesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Expenses retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
