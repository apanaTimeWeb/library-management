import { Controller, Get, Param } from '@nestjs/common';
import { GetDailySettlementService } from '../services/get-daily-settlement.service';

@Controller('api/v1/superadmin/daily-settlements')
export class GetDailySettlementController {
  constructor(private readonly service: GetDailySettlementService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'DailySettlement retrieved successfully', data };
  }
}
