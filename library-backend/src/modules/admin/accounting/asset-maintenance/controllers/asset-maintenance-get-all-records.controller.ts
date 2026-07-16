import { Controller, Get } from '@nestjs/common';
import { AssetMaintenanceGetAllRecordsService } from '../services/asset-maintenance-get-all-records.service';

@Controller('admin/accounting/asset-maintenance')
export class AssetMaintenanceGetAllRecordsController {
  constructor(private readonly service: AssetMaintenanceGetAllRecordsService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}