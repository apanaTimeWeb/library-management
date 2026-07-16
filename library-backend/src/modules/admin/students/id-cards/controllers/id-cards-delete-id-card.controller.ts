import { Controller, Delete, Param } from '@nestjs/common';
import { IdCardsDeleteIDCardService } from '../services/delete-id-card.service';

@Controller('api/v1/admin/id-cards')
export class IdCardsDeleteIDCardController {
  constructor(private readonly service: IdCardsDeleteIDCardService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'IDCard deleted successfully', data: null };
  }
}
