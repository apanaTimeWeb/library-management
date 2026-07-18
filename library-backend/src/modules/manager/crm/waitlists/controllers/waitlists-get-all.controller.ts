import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { WaitlistsGetAllService } from '@/modules/manager/crm/waitlists/services/waitlists-get-all.service';
import { GetWaitlistsQueryDto } from '@/modules/manager/crm/waitlists/dto/get-waitlists-query.dto';

@ApiTags('Waitlists')
@Controller('api/v1/manager/waitlists')
export class WaitlistsGetAllController {
  constructor(private readonly service: WaitlistsGetAllService) {}

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
