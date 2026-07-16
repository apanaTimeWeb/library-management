import { Controller, Post, Body } from '@nestjs/common';
import { CreateLockerService } from '../services/create-locker.service';
import { CreateLockerDto } from '../dto/create-locker.dto';

@Controller('api/v1/admin/lockers')
export class CreateLockerController {
  constructor(private readonly service: CreateLockerService) {}

  @Post()
  async handle(@Body() dto: CreateLockerDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Locker created successfully', data };
  }
}
