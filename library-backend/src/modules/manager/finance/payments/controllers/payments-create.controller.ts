import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsCreateService } from '@/modules/manager/finance/payments/services/payments-create.service';
import { CreatePaymentDto } from '@/modules/manager/finance/payments/dto/create-payment.dto';

@ApiTags('Payments')
@Controller('api/v1/manager/payments')
export class PaymentsCreateController {
  constructor(private readonly service: PaymentsCreateService) {}

  @Post()
  async handle(@Body() dto: CreatePaymentDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
