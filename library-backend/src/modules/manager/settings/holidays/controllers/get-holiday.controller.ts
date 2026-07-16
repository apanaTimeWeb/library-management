import { Controller, Get, Param } from '@nestjs/common';
import { GetHolidayService } from '../services/get-holiday.service';

@Controller('api/v1/manager/holidays')
export class GetHolidayController {
  constructor(private readonly service: GetHolidayService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Holiday retrieved successfully', data };
  }
}
