import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { NoticesUpdateService } from '@/modules/manager/engagement/notices/services/notices-update.service';
import { UpdateNoticeDto } from '@/modules/manager/engagement/notices/dto/update-notice.dto';

@ApiTags('Notices')
@Controller('api/v1/manager/notices')
export class NoticesUpdateController {
  constructor(private readonly service: NoticesUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateNoticeDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
