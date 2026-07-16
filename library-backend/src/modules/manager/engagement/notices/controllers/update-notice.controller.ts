import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateNoticeService } from '../services/update-notice.service';
import { UpdateNoticeDto } from '../dto/update-notice.dto';

@Controller('api/v1/manager/notices')
export class UpdateNoticeController {
  constructor(private readonly service: UpdateNoticeService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateNoticeDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Notice updated successfully', data };
  }
}
