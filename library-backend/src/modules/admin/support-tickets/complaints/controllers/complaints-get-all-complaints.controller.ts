import { Controller, Get, Query } from '@nestjs/common';
import { ComplaintsGetAllService } from '../services/get-all-complaints.service';
import { ComplaintsGetComplaintsQueryDto } from '../dto/get-complaints-query.dto';

@Controller('v1/admin/complaints')
export class ComplaintsGetAllController {
  constructor(private readonly service: ComplaintsGetAllService) {}

  @Get()
  async handle(@Query() query: ComplaintsGetComplaintsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Complaints retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
