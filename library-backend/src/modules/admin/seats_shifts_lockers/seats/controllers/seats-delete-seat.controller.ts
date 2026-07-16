import { Controller, Delete, Param } from '@nestjs/common';
import { SeatsDeleteSeatService } from '../services/delete-seat.service';

@Controller('api/v1/admin/seats')
export class SeatsDeleteSeatController {
  constructor(private readonly service: SeatsDeleteSeatService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Seat deleted successfully', data: null };
  }
}
