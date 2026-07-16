import { Controller, Get, Param } from '@nestjs/common';
import { ShiftsGetShiftService } from '../services/get-shift.service';

@Controller('v1/admin/shifts')
export class ShiftsGetShiftController {
  constructor(private readonly service: ShiftsGetShiftService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Shift retrieved successfully', data };
  }
}
