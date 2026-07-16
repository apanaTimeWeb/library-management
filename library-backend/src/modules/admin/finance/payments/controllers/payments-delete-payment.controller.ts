import { Controller, Delete, Param } from '@nestjs/common';
import { PaymentsDeletePaymentService } from '../services/delete-payment.service';

@Controller('v1/admin/payments')
export class PaymentsDeletePaymentController {
  constructor(private readonly service: PaymentsDeletePaymentService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Payment deleted successfully', data: null };
  }
}
