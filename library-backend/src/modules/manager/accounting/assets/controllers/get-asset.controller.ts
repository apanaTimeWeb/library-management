import { Controller, Get, Param } from '@nestjs/common';
import { GetAssetService } from '../services/get-asset.service';

@Controller('api/v1/manager/assets')
export class GetAssetController {
  constructor(private readonly service: GetAssetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Asset retrieved successfully', data };
  }
}
