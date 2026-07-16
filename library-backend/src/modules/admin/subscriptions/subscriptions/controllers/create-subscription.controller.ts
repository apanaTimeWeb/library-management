import { Controller, Post, Body } from '@nestjs/common';
import { CreateSubscriptionService } from '../services/create-subscription.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Controller('api/v1/admin/subscriptions')
export class CreateSubscriptionController {
  constructor(private readonly service: CreateSubscriptionService) {}

  @Post()
  async handle(@Body() dto: CreateSubscriptionDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Subscription created successfully', data };
  }
}
