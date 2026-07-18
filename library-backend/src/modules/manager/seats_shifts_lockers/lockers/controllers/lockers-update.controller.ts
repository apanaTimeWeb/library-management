import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { LockersUpdateService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-update.service';
import { UpdateLockerDto } from '@/modules/manager/seats_shifts_lockers/lockers/dto/update-locker.dto';

@ApiTags('Lockers')
@Controller('api/v1/manager/lockers')
export class LockersUpdateController {
  constructor(private readonly service: LockersUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateLockerDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
