import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { EnquiriesGetAllService } from '@/modules/manager/crm/enquiries/services/enquiries-get-all.service';
import { GetEnquiriesQueryDto } from '@/modules/manager/crm/enquiries/dto/get-enquiries-query.dto';

@ApiTags('Enquiries')
@Controller('api/v1/manager/enquiries')
export class EnquiriesGetAllController {
  constructor(private readonly service: EnquiriesGetAllService) {}

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
