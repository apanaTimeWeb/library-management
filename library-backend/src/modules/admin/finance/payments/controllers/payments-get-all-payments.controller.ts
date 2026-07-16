import { Controller, Get, Query } from '@nestjs/common';
import { PaymentsGetAllService } from '../services/payments-get-all-payments.service';
import { PaymentsGetPaymentsQueryDto } from '../dto/payments-get-payments-query.dto';

@Controller('v1/admin/payments')
export class PaymentsGetAllController {
  constructor(private readonly service: PaymentsGetAllService) {}

  @Get()
  async handle(@Query() query: PaymentsGetPaymentsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Payments retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
