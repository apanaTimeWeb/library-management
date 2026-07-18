import { Controller, Delete } from '@nestjs/common';
import { AssetMaintenanceDeleteRecordService } from '../services/asset-maintenance-delete-record.service';

@Controller('admin/accounting/asset-maintenance')
export class AssetMaintenanceDeleteRecordController {
  constructor(private readonly service: AssetMaintenanceDeleteRecordService) {}

  @Delete()
  async execute() {
    return this.service.execute();
  }
}