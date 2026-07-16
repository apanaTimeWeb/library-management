import { Controller, Delete } from '@nestjs/common';
import { AssetsDeleteAssetService } from '../services/assets-delete-asset.service';

@Controller('admin/accounting/assets')
export class AssetsDeleteAssetController {
  constructor(private readonly service: AssetsDeleteAssetService) {}

  @Delete()
  async execute() {
    return this.service.execute();
  }
}