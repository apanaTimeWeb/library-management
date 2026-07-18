import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { LockersGetService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-get.service';

@ApiTags('Lockers')
@Controller('api/v1/manager/lockers')
export class LockersGetController {
  constructor(private readonly service: LockersGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
