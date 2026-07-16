import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ShiftsUpdateShiftService } from '../services/shifts-update-shift.service';
import { ShiftsUpdateShiftDto } from '../dto/shifts-update-shift.dto';

@Controller('v1/admin/shifts')
export class ShiftsUpdateShiftController {
  constructor(private readonly service: ShiftsUpdateShiftService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: ShiftsUpdateShiftDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Shift updated successfully', data };
  }
}
