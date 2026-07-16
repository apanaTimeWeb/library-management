import { Controller, Post, Body } from '@nestjs/common';
import { SubscriptionsCreateSubscriptionService } from '../services/create-subscription.service';
import { SubscriptionsCreateSubscriptionDto } from '../dto/create-subscription.dto';

@Controller('api/v1/admin/subscriptions')
export class SubscriptionsCreateSubscriptionController {
  constructor(private readonly service: SubscriptionsCreateSubscriptionService) {}

  @Post()
  async handle(@Body() dto: SubscriptionsCreateSubscriptionDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Subscription created successfully', data };
  }
}
