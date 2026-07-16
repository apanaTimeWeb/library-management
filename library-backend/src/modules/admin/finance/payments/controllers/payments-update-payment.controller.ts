import { Controller, Patch, Param, Body } from '@nestjs/common';
import { PaymentsUpdatePaymentService } from '../services/update-payment.service';
import { PaymentsUpdatePaymentDto } from '../dto/update-payment.dto';

@Controller('v1/admin/payments')
export class PaymentsUpdatePaymentController {
  constructor(private readonly service: PaymentsUpdatePaymentService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: PaymentsUpdatePaymentDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Payment updated successfully', data };
  }
}
