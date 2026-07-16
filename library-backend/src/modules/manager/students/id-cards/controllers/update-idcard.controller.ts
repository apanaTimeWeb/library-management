import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateIDCardService } from '../services/update-idcard.service';
import { UpdateIDCardDto } from '../dto/update-idcard.dto';

@Controller('api/v1/manager/id-cards')
export class UpdateIDCardController {
  constructor(private readonly service: UpdateIDCardService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateIDCardDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'IDCard updated successfully', data };
  }
}
