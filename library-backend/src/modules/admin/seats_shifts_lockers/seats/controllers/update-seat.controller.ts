import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateSeatService } from '../services/update-seat.service';
import { UpdateSeatDto } from '../dto/update-seat.dto';

@Controller('api/v1/admin/seats')
export class UpdateSeatController {
  constructor(private readonly service: UpdateSeatService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateSeatDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Seat updated successfully', data };
  }
}
