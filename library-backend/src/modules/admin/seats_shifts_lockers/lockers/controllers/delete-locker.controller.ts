import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteLockerService } from '../services/delete-locker.service';

@Controller('api/v1/admin/lockers')
export class DeleteLockerController {
  constructor(private readonly service: DeleteLockerService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Locker deleted successfully', data: null };
  }
}
