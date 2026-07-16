import { Controller, Get, Query } from '@nestjs/common';
import { GetAllComplaintsService } from '../services/get-all-complaints.service';
import { GetComplaintsQueryDto } from '../dto/get-complaints-query.dto';

@Controller('api/v1/manager/complaints')
export class GetAllComplaintsController {
  constructor(private readonly service: GetAllComplaintsService) {}

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
