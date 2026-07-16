import { Controller, Get, Query } from '@nestjs/common';
import { GetAllAssetsService } from '../services/get-all-assets.service';
import { GetAssetsQueryDto } from '../dto/get-assets-query.dto';

@Controller('api/v1/manager/assets')
export class GetAllAssetsController {
  constructor(private readonly service: GetAllAssetsService) {}

  @Get()
  async handle(@Query() query: GetAssetsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Assets retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
