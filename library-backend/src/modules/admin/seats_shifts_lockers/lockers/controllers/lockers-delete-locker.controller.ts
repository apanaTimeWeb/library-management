import { Controller, Delete, Param } from '@nestjs/common';
import { LockersDeleteLockerService } from '../services/lockers-delete-locker.service';

@Controller('v1/admin/lockers')
export class LockersDeleteLockerController {
  constructor(private readonly service: LockersDeleteLockerService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Locker deleted successfully', data: null };
  }
}
