import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { NoticesCreateService } from '@/modules/manager/engagement/notices/services/notices-create.service';
import { CreateNoticeDto } from '@/modules/manager/engagement/notices/dto/create-notice.dto';

@ApiTags('Notices')
@Controller('api/v1/manager/notices')
export class NoticesCreateController {
  constructor(private readonly service: NoticesCreateService) {}

  @Post()
  async handle(@Body() dto: CreateNoticeDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
