import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateBillingService } from '../services/update-billing.service';
import { UpdateBillingDto } from '../dto/update-billing.dto';

@Controller('api/v1/superadmin/billing')
export class UpdateBillingController {
  constructor(private readonly service: UpdateBillingService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateBillingDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Billing updated successfully', data };
  }
}
