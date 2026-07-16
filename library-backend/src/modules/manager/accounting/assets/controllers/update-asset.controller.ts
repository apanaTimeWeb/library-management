import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateAssetService } from '../services/update-asset.service';
import { UpdateAssetDto } from '../dto/update-asset.dto';

@Controller('api/v1/manager/assets')
export class UpdateAssetController {
  constructor(private readonly service: UpdateAssetService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateAssetDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Asset updated successfully', data };
  }
}
