import { Controller, Post, Body } from '@nestjs/common';
import { CreateShiftService } from '../services/create-shift.service';
import { CreateShiftDto } from '../dto/create-shift.dto';

@Controller('api/v1/manager/shifts')
export class CreateShiftController {
  constructor(private readonly service: CreateShiftService) {}

  @Post()
  async handle(@Body() dto: CreateShiftDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Shift created successfully', data };
  }
}
