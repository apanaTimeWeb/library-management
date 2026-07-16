import { Controller, Get } from '@nestjs/common';
import { DailySettlementsGetAllSettlementsService } from '../services/daily-settlements-get-all-settlements.service';

@Controller('admin/accounting/daily-settlements')
export class DailySettlementsGetAllSettlementsController {
  constructor(private readonly service: DailySettlementsGetAllSettlementsService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}