import { Controller, Delete, Param } from '@nestjs/common';
import { SeatsDeleteSeatService } from '../services/seats-delete-seat.service';

@Controller('v1/admin/seats')
export class SeatsDeleteSeatController {
  constructor(private readonly service: SeatsDeleteSeatService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Seat deleted successfully', data: null };
  }
}
