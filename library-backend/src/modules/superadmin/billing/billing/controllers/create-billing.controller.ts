import { Controller, Post, Body } from '@nestjs/common';
import { CreateBillingService } from '../services/create-billing.service';
import { CreateBillingDto } from '../dto/create-billing.dto';

@Controller('api/v1/superadmin/billing')
export class CreateBillingController {
  constructor(private readonly service: CreateBillingService) {}

  @Post()
  async handle(@Body() dto: CreateBillingDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Billing created successfully', data };
  }
}
