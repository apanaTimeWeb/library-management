import { Controller, Get, Query } from '@nestjs/common';
import { GetAllBranchsService } from '../services/get-all-branches.service';
import { GetBranchsQueryDto } from '../dto/get-branches-query.dto';

@Controller('api/v1/superadmin/branches')
export class GetAllBranchsController {
  constructor(private readonly service: GetAllBranchsService) {}

  @Get()
  async handle(@Query() query: GetBranchsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Branchs retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
