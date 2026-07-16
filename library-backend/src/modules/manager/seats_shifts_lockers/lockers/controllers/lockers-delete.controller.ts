import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { LockersDeleteService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-delete.service';

@ApiTags('Lockers')
@Controller('api/v1/manager/lockers')
export class LockersDeleteController {
  constructor(private readonly service: LockersDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
