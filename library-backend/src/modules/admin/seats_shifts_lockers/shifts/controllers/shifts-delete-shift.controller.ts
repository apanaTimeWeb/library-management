import { Controller, Delete, Param } from '@nestjs/common';
import { ShiftsDeleteShiftService } from '../services/delete-shift.service';

@Controller('api/v1/admin/shifts')
export class ShiftsDeleteShiftController {
  constructor(private readonly service: ShiftsDeleteShiftService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Shift deleted successfully', data: null };
  }
}
