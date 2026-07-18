import { Controller, Get, Query } from '@nestjs/common';
import { GetAllBillingsService } from '../services/get-all-billing.service';
import { GetBillingsQueryDto } from '../dto/get-billing-query.dto';

@Controller('api/v1/superadmin/billing')
export class GetAllBillingsController {
  constructor(private readonly service: GetAllBillingsService) {}

  @Get()
  async handle(@Query() query: GetBillingsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Billings retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
