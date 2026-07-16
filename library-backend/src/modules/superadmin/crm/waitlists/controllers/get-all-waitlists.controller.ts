import { Controller, Get, Query } from '@nestjs/common';
import { GetAllWaitlistsService } from '../services/get-all-waitlists.service';
import { GetWaitlistsQueryDto } from '../dto/get-waitlists-query.dto';

@Controller('api/v1/superadmin/waitlists')
export class GetAllWaitlistsController {
  constructor(private readonly service: GetAllWaitlistsService) {}

  @Get()
  async handle(@Query() query: GetWaitlistsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Waitlists retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
