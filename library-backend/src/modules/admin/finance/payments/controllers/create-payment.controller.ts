import { Controller, Post, Body } from '@nestjs/common';
import { CreatePaymentService } from '../services/create-payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Controller('api/v1/admin/payments')
export class CreatePaymentController {
  constructor(private readonly service: CreatePaymentService) {}

  @Post()
  async handle(@Body() dto: CreatePaymentDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Payment created successfully', data };
  }
}
