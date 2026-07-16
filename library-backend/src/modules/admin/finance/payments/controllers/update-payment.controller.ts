import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdatePaymentService } from '../services/update-payment.service';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

@Controller('api/v1/admin/payments')
export class UpdatePaymentController {
  constructor(private readonly service: UpdatePaymentService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Payment updated successfully', data };
  }
}
