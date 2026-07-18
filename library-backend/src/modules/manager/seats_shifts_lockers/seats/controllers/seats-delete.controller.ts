import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { SeatsDeleteService } from '@/modules/manager/seats_shifts_lockers/seats/services/seats-delete.service';

@ApiTags('Seats')
@Controller('api/v1/manager/seats')
export class SeatsDeleteController {
  constructor(private readonly service: SeatsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
