import { Controller, Get, Query } from '@nestjs/common';
import { GetAllPaymentsService } from '../services/get-all-payments.service';
import { GetPaymentsQueryDto } from '../dto/get-payments-query.dto';

@Controller('api/v1/admin/payments')
export class GetAllPaymentsController {
  constructor(private readonly service: GetAllPaymentsService) {}

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
