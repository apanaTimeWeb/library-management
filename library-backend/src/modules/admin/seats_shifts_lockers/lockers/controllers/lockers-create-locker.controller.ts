import { Controller, Post, Body } from '@nestjs/common';
import { LockersCreateLockerService } from '../services/lockers-create-locker.service';
import { LockersCreateLockerDto } from '../dto/lockers-create-locker.dto';

@Controller('v1/admin/lockers')
export class LockersCreateLockerController {
  constructor(private readonly service: LockersCreateLockerService) {}

  @Post()
  async handle(@Body() dto: LockersCreateLockerDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Locker created successfully', data };
  }
}
