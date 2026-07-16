import { Controller, Get, Param } from '@nestjs/common';
import { GetLockerService } from '../services/get-locker.service';

@Controller('api/v1/manager/lockers')
export class GetLockerController {
  constructor(private readonly service: GetLockerService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Locker retrieved successfully', data };
  }
}
