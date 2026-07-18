import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { ShiftsCreateService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-create.service';
import { CreateShiftDto } from '@/modules/manager/seats_shifts_lockers/shifts/dto/create-shift.dto';

@ApiTags('Shifts')
@Controller('api/v1/manager/shifts')
export class ShiftsCreateController {
  constructor(private readonly service: ShiftsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateShiftDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
