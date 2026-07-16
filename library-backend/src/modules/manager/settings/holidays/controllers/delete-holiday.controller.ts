import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteHolidayService } from '../services/delete-holiday.service';

@Controller('api/v1/manager/holidays')
export class DeleteHolidayController {
  constructor(private readonly service: DeleteHolidayService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Holiday deleted successfully', data: null };
  }
}
