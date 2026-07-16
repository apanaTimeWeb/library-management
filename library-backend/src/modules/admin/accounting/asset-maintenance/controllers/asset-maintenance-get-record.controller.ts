import { Controller, Get } from '@nestjs/common';
import { AssetMaintenanceGetRecordService } from '../services/asset-maintenance-get-record.service';

@Controller('admin/accounting/asset-maintenance')
export class AssetMaintenanceGetRecordController {
  constructor(private readonly service: AssetMaintenanceGetRecordService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}