import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateHolidayService } from '../services/update-holiday.service';
import { UpdateHolidayDto } from '../dto/update-holiday.dto';

@Controller('api/v1/manager/holidays')
export class UpdateHolidayController {
  constructor(private readonly service: UpdateHolidayService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateHolidayDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Holiday updated successfully', data };
  }
}
