import { Controller, Delete, Param } from '@nestjs/common';
import { SubscriptionsDeleteSubscriptionService } from '../services/subscriptions-delete-subscription.service';

@Controller('v1/admin/subscriptions')
export class SubscriptionsDeleteSubscriptionController {
  constructor(private readonly service: SubscriptionsDeleteSubscriptionService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Subscription deleted successfully', data: null };
  }
}
