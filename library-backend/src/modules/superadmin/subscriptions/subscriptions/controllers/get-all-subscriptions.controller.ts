import { Controller, Get, Query } from '@nestjs/common';
import { GetAllSubscriptionsService } from '../services/get-all-subscriptions.service';
import { GetSubscriptionsQueryDto } from '../dto/get-subscriptions-query.dto';

@Controller('api/v1/superadmin/subscriptions')
export class GetAllSubscriptionsController {
  constructor(private readonly service: GetAllSubscriptionsService) {}

  @Get()
  async handle(@Query() query: GetSubscriptionsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Subscriptions retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
