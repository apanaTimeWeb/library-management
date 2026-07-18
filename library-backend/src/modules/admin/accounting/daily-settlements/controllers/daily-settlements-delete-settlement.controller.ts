import { Controller, Delete } from '@nestjs/common';
import { DailySettlementsDeleteSettlementService } from '../services/daily-settlements-delete-settlement.service';

@Controller('admin/accounting/daily-settlements')
export class DailySettlementsDeleteSettlementController {
  constructor(private readonly service: DailySettlementsDeleteSettlementService) {}

  @Delete()
  async execute() {
    return this.service.execute();
  }
}