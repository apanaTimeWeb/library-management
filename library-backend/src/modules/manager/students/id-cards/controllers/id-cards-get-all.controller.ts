import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { IdCardsGetAllService } from '@/modules/manager/students/id-cards/services/id-cards-get-all.service';
import { GetIDCardsQueryDto } from '@/modules/manager/students/id-cards/dto/get-id-cards-query.dto';

@ApiTags('Id-cards')
@Controller('api/v1/manager/id-cards')
export class IdCardsGetAllController {
  constructor(private readonly service: IdCardsGetAllService) {}

  @Get()
  async handle(@Query() query: GetIDCardsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'IDCards retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
