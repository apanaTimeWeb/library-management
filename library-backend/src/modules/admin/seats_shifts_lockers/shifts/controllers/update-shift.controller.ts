import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateShiftService } from '../services/update-shift.service';
import { UpdateShiftDto } from '../dto/update-shift.dto';

@Controller('api/v1/admin/shifts')
export class UpdateShiftController {
  constructor(private readonly service: UpdateShiftService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateShiftDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Shift updated successfully', data };
  }
}
