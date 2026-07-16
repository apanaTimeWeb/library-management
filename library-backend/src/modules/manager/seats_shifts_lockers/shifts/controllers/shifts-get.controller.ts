import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { ShiftsGetService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-get.service';

@ApiTags('Shifts')
@Controller('api/v1/manager/shifts')
export class ShiftsGetController {
  constructor(private readonly service: ShiftsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
