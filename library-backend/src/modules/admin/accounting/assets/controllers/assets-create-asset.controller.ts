import { Controller, Post } from '@nestjs/common';
import { AssetsCreateAssetService } from '../services/assets-create-asset.service';

@Controller('admin/accounting/assets')
export class AssetsCreateAssetController {
  constructor(private readonly service: AssetsCreateAssetService) {}

  @Post()
  async execute() {
    return this.service.execute();
  }
}