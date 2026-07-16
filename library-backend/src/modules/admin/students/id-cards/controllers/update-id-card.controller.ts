import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateIDCardService } from '../services/update-id-card.service';
import { UpdateIDCardDto } from '../dto/update-id-card.dto';

@Controller('api/v1/admin/id-cards')
export class UpdateIDCardController {
  constructor(private readonly service: UpdateIDCardService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateIDCardDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'IDCard updated successfully', data };
  }
}
