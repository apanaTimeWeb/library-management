import { Controller, Post, Body } from '@nestjs/common';
import { ShiftsCreateShiftService } from '../services/create-shift.service';
import { ShiftsCreateShiftDto } from '../dto/create-shift.dto';

@Controller('v1/admin/shifts')
export class ShiftsCreateShiftController {
  constructor(private readonly service: ShiftsCreateShiftService) {}

  @Post()
  async handle(@Body() dto: ShiftsCreateShiftDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Shift created successfully', data };
  }
}
