import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteBillingService } from '../services/delete-billing.service';

@Controller('api/v1/superadmin/billing')
export class DeleteBillingController {
  constructor(private readonly service: DeleteBillingService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Billing deleted successfully', data: null };
  }
}
