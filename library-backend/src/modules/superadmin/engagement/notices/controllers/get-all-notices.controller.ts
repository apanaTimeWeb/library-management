import { Controller, Get, Query } from '@nestjs/common';
import { GetAllNoticesService } from '../services/get-all-notices.service';
import { GetNoticesQueryDto } from '../dto/get-notices-query.dto';

@Controller('api/v1/superadmin/notices')
export class GetAllNoticesController {
  constructor(private readonly service: GetAllNoticesService) {}

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
