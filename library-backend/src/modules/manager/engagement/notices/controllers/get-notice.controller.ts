import { Controller, Get, Param } from '@nestjs/common';
import { GetNoticeService } from '../services/get-notice.service';

@Controller('api/v1/manager/notices')
export class GetNoticeController {
  constructor(private readonly service: GetNoticeService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Notice retrieved successfully', data };
  }
}
