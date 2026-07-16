import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SeatsUpdateSeatService } from '../services/update-seat.service';
import { SeatsUpdateSeatDto } from '../dto/update-seat.dto';

@Controller('api/v1/admin/seats')
export class SeatsUpdateSeatController {
  constructor(private readonly service: SeatsUpdateSeatService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: SeatsUpdateSeatDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Seat updated successfully', data };
  }
}
