import { Controller, Get, Query } from '@nestjs/common';
import { SubscriptionsGetAllService } from '../services/get-all-subscriptions.service';
import { SubscriptionsGetSubscriptionsQueryDto } from '../dto/get-subscriptions-query.dto';

@Controller('api/v1/admin/subscriptions')
export class SubscriptionsGetAllController {
  constructor(private readonly service: SubscriptionsGetAllService) {}

  @Get()
  async handle(@Query() query: SubscriptionsGetSubscriptionsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Subscriptions retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
