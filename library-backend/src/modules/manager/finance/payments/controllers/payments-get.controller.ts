import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsGetService } from '@/modules/manager/finance/payments/services/payments-get.service';

@ApiTags('Payments')
@Controller('api/v1/manager/payments')
export class PaymentsGetController {
  constructor(private readonly service: PaymentsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
