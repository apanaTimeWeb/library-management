import { Controller, Post, Body } from '@nestjs/common';
import { CreateDailySettlementService } from '../services/create-daily-settlement.service';
import { CreateDailySettlementDto } from '../dto/create-daily-settlement.dto';

@Controller('api/v1/superadmin/daily-settlements')
export class CreateDailySettlementController {
  constructor(private readonly service: CreateDailySettlementService) {}

  @Post()
  async handle(@Body() dto: CreateDailySettlementDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'DailySettlement created successfully', data };
  }
}
