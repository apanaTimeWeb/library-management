import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SubscriptionsUpdateSubscriptionService } from '../services/subscriptions-update-subscription.service';
import { SubscriptionsUpdateSubscriptionDto } from '../dto/subscriptions-update-subscription.dto';

@Controller('v1/admin/subscriptions')
export class SubscriptionsUpdateSubscriptionController {
  constructor(private readonly service: SubscriptionsUpdateSubscriptionService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: SubscriptionsUpdateSubscriptionDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Subscription updated successfully', data };
  }
}
