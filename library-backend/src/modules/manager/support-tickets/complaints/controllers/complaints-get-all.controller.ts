import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { ComplaintsGetAllService } from '@/modules/manager/support-tickets/complaints/services/complaints-get-all.service';
import { GetComplaintsQueryDto } from '@/modules/manager/support-tickets/complaints/dto/get-complaints-query.dto';

@ApiTags('Complaints')
@Controller('api/v1/manager/complaints')
export class ComplaintsGetAllController {
  constructor(private readonly service: ComplaintsGetAllService) {}

  @Get()
  async handle(@Query() query: GetComplaintsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Complaints retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
