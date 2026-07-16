import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteSubscriptionService } from '../services/delete-subscription.service';

@Controller('api/v1/admin/subscriptions')
export class DeleteSubscriptionController {
  constructor(private readonly service: DeleteSubscriptionService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Subscription deleted successfully', data: null };
  }
}
