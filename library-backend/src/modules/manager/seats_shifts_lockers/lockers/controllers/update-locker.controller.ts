import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateLockerService } from '../services/update-locker.service';
import { UpdateLockerDto } from '../dto/update-locker.dto';

@Controller('api/v1/manager/lockers')
export class UpdateLockerController {
  constructor(private readonly service: UpdateLockerService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateLockerDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Locker updated successfully', data };
  }
}
