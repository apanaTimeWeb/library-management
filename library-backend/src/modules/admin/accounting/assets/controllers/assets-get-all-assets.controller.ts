import { Controller, Get } from '@nestjs/common';
import { AssetsGetAllAssetsService } from '../services/assets-get-all-assets.service';

@Controller('admin/accounting/assets')
export class AssetsGetAllAssetsController {
  constructor(private readonly service: AssetsGetAllAssetsService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}