import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { ShiftsDeleteService } from '@/modules/manager/seats_shifts_lockers/shifts/services/shifts-delete.service';

@ApiTags('Shifts')
@Controller('api/v1/manager/shifts')
export class ShiftsDeleteController {
  constructor(private readonly service: ShiftsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
