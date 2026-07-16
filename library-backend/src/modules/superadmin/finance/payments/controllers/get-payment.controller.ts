import { Controller, Get, Param } from '@nestjs/common';
import { GetPaymentService } from '../services/get-payment.service';

@Controller('api/v1/superadmin/payments')
export class GetPaymentController {
  constructor(private readonly service: GetPaymentService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Payment retrieved successfully', data };
  }
}
