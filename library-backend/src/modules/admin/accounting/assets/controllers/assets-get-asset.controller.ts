import { Controller, Get } from '@nestjs/common';
import { AssetsGetAssetService } from '../services/assets-get-asset.service';

@Controller('admin/accounting/assets')
export class AssetsGetAssetController {
  constructor(private readonly service: AssetsGetAssetService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}