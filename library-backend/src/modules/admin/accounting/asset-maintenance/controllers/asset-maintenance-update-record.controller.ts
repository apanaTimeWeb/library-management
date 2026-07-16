import { Controller, Patch } from '@nestjs/common';
import { AssetMaintenanceUpdateRecordService } from '../services/asset-maintenance-update-record.service';

@Controller('admin/accounting/asset-maintenance')
export class AssetMaintenanceUpdateRecordController {
  constructor(private readonly service: AssetMaintenanceUpdateRecordService) {}

  @Patch()
  async execute() {
    return this.service.execute();
  }
}