import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { NoticesGetService } from '@/modules/manager/engagement/notices/services/notices-get.service';

@ApiTags('Notices')
@Controller('api/v1/manager/notices')
export class NoticesGetController {
  constructor(private readonly service: NoticesGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
