import { Controller, Get, Param } from '@nestjs/common';
import { GetShiftService } from '../services/get-shift.service';

@Controller('api/v1/manager/shifts')
export class GetShiftController {
  constructor(private readonly service: GetShiftService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Shift retrieved successfully', data };
  }
}
