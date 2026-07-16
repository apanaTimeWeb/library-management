import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { PaymentsDeleteService } from '@/modules/manager/finance/payments/services/payments-delete.service';

@ApiTags('Payments')
@Controller('api/v1/manager/payments')
export class PaymentsDeleteController {
  constructor(private readonly service: PaymentsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
