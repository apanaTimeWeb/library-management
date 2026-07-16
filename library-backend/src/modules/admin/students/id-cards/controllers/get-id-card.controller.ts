import { Controller, Get, Param } from '@nestjs/common';
import { GetIDCardService } from '../services/get-id-card.service';

@Controller('api/v1/admin/id-cards')
export class GetIDCardController {
  constructor(private readonly service: GetIDCardService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'IDCard retrieved successfully', data };
  }
}
