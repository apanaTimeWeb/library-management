import { Controller, Get, Param } from '@nestjs/common';
import { IdCardsGetIDCardService } from '../services/id-cards-get-id-card.service';

@Controller('v1/admin/id-cards')
export class IdCardsGetIDCardController {
  constructor(private readonly service: IdCardsGetIDCardService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'IDCard retrieved successfully', data };
  }
}
