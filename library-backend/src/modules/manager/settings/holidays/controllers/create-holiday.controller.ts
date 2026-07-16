import { Controller, Post, Body } from '@nestjs/common';
import { CreateHolidayService } from '../services/create-holiday.service';
import { CreateHolidayDto } from '../dto/create-holiday.dto';

@Controller('api/v1/manager/holidays')
export class CreateHolidayController {
  constructor(private readonly service: CreateHolidayService) {}

  @Post()
  async handle(@Body() dto: CreateHolidayDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Holiday created successfully', data };
  }
}
