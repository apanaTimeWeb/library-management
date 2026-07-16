import { PartialType } from '@nestjs/swagger';
import { AssetMaintenanceCreateRecordDto } from './asset-maintenance-create-record.dto';
export class AssetMaintenanceUpdateRecordDto extends PartialType(AssetMaintenanceCreateRecordDto) {}