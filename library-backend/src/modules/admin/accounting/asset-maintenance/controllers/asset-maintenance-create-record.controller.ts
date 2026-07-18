import { Controller, Post } from '@nestjs/common';
import { AssetMaintenanceCreateRecordService } from '../services/asset-maintenance-create-record.service';

@Controller('admin/accounting/asset-maintenance')
export class AssetMaintenanceCreateRecordController {
  constructor(private readonly service: AssetMaintenanceCreateRecordService) {}

  @Post()
  async execute() {
    return this.service.execute();
  }
}