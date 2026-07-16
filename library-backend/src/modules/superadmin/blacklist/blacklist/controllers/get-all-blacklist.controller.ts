import { Controller, Get, Query } from '@nestjs/common';
import { GetAllBlacklistsService } from '../services/get-all-blacklist.service';
import { GetBlacklistsQueryDto } from '../dto/get-blacklist-query.dto';

@Controller('api/v1/superadmin/blacklist')
export class GetAllBlacklistsController {
  constructor(private readonly service: GetAllBlacklistsService) {}

  @Get()
  async handle(@Query() query: GetBlacklistsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Blacklists retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
