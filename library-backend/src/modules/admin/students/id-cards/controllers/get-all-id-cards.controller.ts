import { Controller, Get, Query } from '@nestjs/common';
import { GetAllIDCardsService } from '../services/get-all-id-cards.service';
import { GetIDCardsQueryDto } from '../dto/get-id-cards-query.dto';

@Controller('api/v1/admin/id-cards')
export class GetAllIDCardsController {
  constructor(private readonly service: GetAllIDCardsService) {}

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
