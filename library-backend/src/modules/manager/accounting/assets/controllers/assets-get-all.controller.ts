import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { AssetsGetAllService } from '@/modules/manager/accounting/assets/services/assets-get-all.service';
import { GetAssetsQueryDto } from '@/modules/manager/accounting/assets/dto/get-assets-query.dto';

@ApiTags('Assets')
@Controller('api/v1/manager/assets')
export class AssetsGetAllController {
  constructor(private readonly service: AssetsGetAllService) {}

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
