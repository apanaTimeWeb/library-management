import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { LockersCreateService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-create.service';
import { CreateLockerDto } from '@/modules/manager/seats_shifts_lockers/lockers/dto/create-locker.dto';

@ApiTags('Lockers')
@Controller('api/v1/manager/lockers')
export class LockersCreateController {
  constructor(private readonly service: LockersCreateService) {}

  @Post()
  async handle(@Body() dto: CreateLockerDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
