import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { PaymentsUpdateService } from '@/modules/manager/finance/payments/services/payments-update.service';
import { UpdatePaymentDto } from '@/modules/manager/finance/payments/dto/update-payment.dto';

@ApiTags('Payments')
@Controller('api/v1/manager/payments')
export class PaymentsUpdateController {
  constructor(private readonly service: PaymentsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
