import { Controller, Post, Body } from '@nestjs/common';
import { IdCardsCreateIDCardService } from '../services/create-id-card.service';
import { IdCardsCreateIDCardDto } from '../dto/create-id-card.dto';

@Controller('v1/admin/id-cards')
export class IdCardsCreateIDCardController {
  constructor(private readonly service: IdCardsCreateIDCardService) {}

  @Post()
  async handle(@Body() dto: IdCardsCreateIDCardDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'IDCard created successfully', data };
  }
}
