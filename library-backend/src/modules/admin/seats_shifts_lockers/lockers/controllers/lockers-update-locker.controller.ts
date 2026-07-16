import { Controller, Patch, Param, Body } from '@nestjs/common';
import { LockersUpdateLockerService } from '../services/update-locker.service';
import { LockersUpdateLockerDto } from '../dto/update-locker.dto';

@Controller('api/v1/admin/lockers')
export class LockersUpdateLockerController {
  constructor(private readonly service: LockersUpdateLockerService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: LockersUpdateLockerDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Locker updated successfully', data };
  }
}
