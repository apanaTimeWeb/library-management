import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateSubscriptionService } from '../services/update-subscription.service';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';

@Controller('api/v1/admin/subscriptions')
export class UpdateSubscriptionController {
  constructor(private readonly service: UpdateSubscriptionService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Subscription updated successfully', data };
  }
}
