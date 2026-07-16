import { Controller, Get } from '@nestjs/common';
import { DailySettlementsGetSettlementService } from '../services/daily-settlements-get-settlement.service';

@Controller('admin/accounting/daily-settlements')
export class DailySettlementsGetSettlementController {
  constructor(private readonly service: DailySettlementsGetSettlementService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}