import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ShiftsUpdateService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-update.service';
import { UpdateShiftDto } from '@/modules/manager/seats_shifts_lockers/shifts/dto/update-shift.dto';

@ApiTags('Shifts')
@Controller('api/v1/manager/shifts')
export class ShiftsUpdateController {
  constructor(private readonly service: ShiftsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateShiftDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
