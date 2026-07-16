import { Controller, Get, Param } from '@nestjs/common';
import { GetSubscriptionService } from '../services/get-subscription.service';

@Controller('api/v1/admin/subscriptions')
export class GetSubscriptionController {
  constructor(private readonly service: GetSubscriptionService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Subscription retrieved successfully', data };
  }
}
