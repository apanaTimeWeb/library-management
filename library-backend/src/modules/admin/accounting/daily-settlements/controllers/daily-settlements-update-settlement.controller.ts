import { Controller, Patch } from '@nestjs/common';
import { DailySettlementsUpdateSettlementService } from '../services/daily-settlements-update-settlement.service';

@Controller('admin/accounting/daily-settlements')
export class DailySettlementsUpdateSettlementController {
  constructor(private readonly service: DailySettlementsUpdateSettlementService) {}

  @Patch()
  async execute() {
    return this.service.execute();
  }
}