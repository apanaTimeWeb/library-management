import { Controller, Get, Param } from '@nestjs/common';
import { GetBillingService } from '../services/get-billing.service';

@Controller('api/v1/superadmin/billing')
export class GetBillingController {
  constructor(private readonly service: GetBillingService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Billing retrieved successfully', data };
  }
}
