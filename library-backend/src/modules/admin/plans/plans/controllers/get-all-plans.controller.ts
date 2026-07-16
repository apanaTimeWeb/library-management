import { Controller, Get, Query } from '@nestjs/common';
import { GetAllPlansService } from '../services/get-all-plans.service';
import { GetPlansQueryDto } from '../dto/get-plans-query.dto';

@Controller('api/v1/admin/plans')
export class GetAllPlansController {
  constructor(private readonly getAllPlansService: GetAllPlansService) {}

  @Get()
  async handle(@Query() query: GetPlansQueryDto) {
    const { items, total } = await this.getAllPlansService.execute(query);
    return {
      success: true,
      message: 'Plans retrieved successfully',
      data: items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
      },
    };
  }
}
