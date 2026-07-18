import { Controller, Patch } from '@nestjs/common';
import { AssetsUpdateAssetService } from '../services/assets-update-asset.service';

@Controller('admin/accounting/assets')
export class AssetsUpdateAssetController {
  constructor(private readonly service: AssetsUpdateAssetService) {}

  @Patch()
  async execute() {
    return this.service.execute();
  }
}