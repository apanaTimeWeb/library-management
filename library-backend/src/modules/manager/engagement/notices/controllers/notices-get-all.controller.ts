import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { NoticesGetAllService } from '@/modules/manager/engagement/notices/services/notices-get-all.service';
import { GetNoticesQueryDto } from '@/modules/manager/engagement/notices/dto/get-notices-query.dto';

@ApiTags('Notices')
@Controller('api/v1/manager/notices')
export class NoticesGetAllController {
  constructor(private readonly service: NoticesGetAllService) {}

  @Get()
  async handle(@Query() query: GetNoticesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Notices retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
