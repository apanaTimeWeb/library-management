import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePaymentService } from '../services/delete-payment.service';

@Controller('api/v1/manager/payments')
export class DeletePaymentController {
  constructor(private readonly service: DeletePaymentService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Payment deleted successfully', data: null };
  }
}
