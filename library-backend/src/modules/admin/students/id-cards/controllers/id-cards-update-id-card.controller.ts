import { Controller, Patch, Param, Body } from '@nestjs/common';
import { IdCardsUpdateIDCardService } from '../services/id-cards-update-id-card.service';
import { IdCardsUpdateIDCardDto } from '../dto/id-cards-update-id-card.dto';

@Controller('v1/admin/id-cards')
export class IdCardsUpdateIDCardController {
  constructor(private readonly service: IdCardsUpdateIDCardService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: IdCardsUpdateIDCardDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'IDCard updated successfully', data };
  }
}
