import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { PaymentsGetAllService } from '@/modules/manager/finance/payments/services/payments-get-all.service';
import { GetPaymentsQueryDto } from '@/modules/manager/finance/payments/dto/get-payments-query.dto';

@ApiTags('Payments')
@Controller('api/v1/manager/payments')
export class PaymentsGetAllController {
  constructor(private readonly service: PaymentsGetAllService) {}

  @Get()
  async handle(@Query() query: GetPaymentsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Payments retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
