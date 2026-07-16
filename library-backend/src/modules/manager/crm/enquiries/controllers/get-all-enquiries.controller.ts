import { Controller, Get, Query } from '@nestjs/common';
import { GetAllEnquiriesService } from '../services/get-all-enquiries.service';
import { GetEnquiriesQueryDto } from '../dto/get-enquiries-query.dto';

@Controller('api/v1/manager/enquiries')
export class GetAllEnquiriesController {
  constructor(private readonly service: GetAllEnquiriesService) {}

  @Get()
  async handle(@Query() query: GetEnquiriesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Enquiries retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
