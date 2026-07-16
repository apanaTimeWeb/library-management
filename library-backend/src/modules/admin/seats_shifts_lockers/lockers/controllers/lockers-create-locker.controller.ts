import { Controller, Post, Body } from '@nestjs/common';
import { LockersCreateLockerService } from '../services/create-locker.service';
import { LockersCreateLockerDto } from '../dto/create-locker.dto';

@Controller('api/v1/admin/lockers')
export class LockersCreateLockerController {
  constructor(private readonly service: LockersCreateLockerService) {}

  @Post()
  async handle(@Body() dto: LockersCreateLockerDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Locker created successfully', data };
  }
}
