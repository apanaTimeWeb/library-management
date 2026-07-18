import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteBlacklistService } from '../services/delete-blacklist.service';

@Controller('api/v1/superadmin/blacklist')
export class DeleteBlacklistController {
  constructor(private readonly service: DeleteBlacklistService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Blacklist deleted successfully', data: null };
  }
}
