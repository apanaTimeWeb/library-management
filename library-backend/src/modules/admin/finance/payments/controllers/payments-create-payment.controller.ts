import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsCreatePaymentService } from '../services/payments-create-payment.service';
import { PaymentsCreatePaymentDto } from '../dto/payments-create-payment.dto';

@Controller('v1/admin/payments')
export class PaymentsCreatePaymentController {
  constructor(private readonly service: PaymentsCreatePaymentService) {}

  @Post()
  async handle(@Body() dto: PaymentsCreatePaymentDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Payment created successfully', data };
  }
}
