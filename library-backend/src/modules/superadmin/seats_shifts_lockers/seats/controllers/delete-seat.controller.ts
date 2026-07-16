import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteSeatService } from '../services/delete-seat.service';

@Controller('api/v1/superadmin/seats')
export class DeleteSeatController {
  constructor(private readonly service: DeleteSeatService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Seat deleted successfully', data: null };
  }
}
