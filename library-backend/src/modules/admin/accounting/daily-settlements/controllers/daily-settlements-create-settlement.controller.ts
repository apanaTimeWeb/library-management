import { Controller, Post } from '@nestjs/common';
import { DailySettlementsCreateSettlementService } from '../services/daily-settlements-create-settlement.service';

@Controller('admin/accounting/daily-settlements')
export class DailySettlementsCreateSettlementController {
  constructor(private readonly service: DailySettlementsCreateSettlementService) {}

  @Post()
  async execute() {
    return this.service.execute();
  }
}