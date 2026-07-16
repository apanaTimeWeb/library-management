import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteNoticeService } from '../services/delete-notice.service';

@Controller('api/v1/manager/notices')
export class DeleteNoticeController {
  constructor(private readonly service: DeleteNoticeService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Notice deleted successfully', data: null };
  }
}
