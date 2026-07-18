import { Controller, Get, Param } from '@nestjs/common';
import { SubscriptionsGetSubscriptionService } from '../services/subscriptions-get-subscription.service';

@Controller('v1/admin/subscriptions')
export class SubscriptionsGetSubscriptionController {
  constructor(private readonly service: SubscriptionsGetSubscriptionService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Subscription retrieved successfully', data };
  }
}
