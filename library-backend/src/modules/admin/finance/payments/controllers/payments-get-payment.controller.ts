import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsGetPaymentService } from '../services/get-payment.service';

@Controller('api/v1/admin/payments')
export class PaymentsGetPaymentController {
  constructor(private readonly service: PaymentsGetPaymentService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Payment retrieved successfully', data };
  }
}
