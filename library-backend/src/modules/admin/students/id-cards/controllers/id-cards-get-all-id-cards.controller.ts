import { Controller, Get, Query } from '@nestjs/common';
import { IdCardsGetAllIDCardsService } from '../services/get-all-id-cards.service';
import { IdCardsGetIDCardsQueryDto } from '../dto/get-id-cards-query.dto';

@Controller('v1/admin/id-cards')
export class IdCardsGetAllIDCardsController {
  constructor(private readonly service: IdCardsGetAllIDCardsService) {}

  @Get()
  async handle(@Query() query: IdCardsGetIDCardsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'IDCards retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
