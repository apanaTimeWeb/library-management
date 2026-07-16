import { Controller, Get, Query } from '@nestjs/common';
import { PlansGetAllService } from '../services/get-all-plans.service';
import { PlansGetPlansQueryDto } from '../dto/get-plans-query.dto';

@Controller('v1/admin/plans')
export class PlansGetAllController {
  constructor(private readonly getAllService: PlansGetAllService) {}

  @Get()
  async handle(@Query() query: PlansGetPlansQueryDto) {
    const { items, total } = await this.getAllService.execute(query);
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
