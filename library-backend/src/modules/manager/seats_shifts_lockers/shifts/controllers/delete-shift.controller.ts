import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteShiftService } from '../services/delete-shift.service';

@Controller('api/v1/manager/shifts')
export class DeleteShiftController {
  constructor(private readonly service: DeleteShiftService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Shift deleted successfully', data: null };
  }
}
