import { Controller, Get, Param } from '@nestjs/common';
import { LockersGetLockerService } from '../services/lockers-get-locker.service';

@Controller('v1/admin/lockers')
export class LockersGetLockerController {
  constructor(private readonly service: LockersGetLockerService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Locker retrieved successfully', data };
  }
}
