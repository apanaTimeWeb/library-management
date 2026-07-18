import { Controller, Get, Query } from '@nestjs/common';
import { GetAllPlansService } from '../services/get-all-plans.service';
import { GetPlansQueryDto } from '../dto/get-plans-query.dto';

@Controller('api/v1/superadmin/plans')
export class GetAllPlansController {
  constructor(private readonly service: GetAllPlansService) {}

  @Get()
  async handle(@Query() query: GetPlansQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Plans retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
