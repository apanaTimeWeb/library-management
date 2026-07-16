import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteAssetService } from '../services/delete-asset.service';

@Controller('api/v1/manager/assets')
export class DeleteAssetController {
  constructor(private readonly service: DeleteAssetService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Asset deleted successfully', data: null };
  }
}
