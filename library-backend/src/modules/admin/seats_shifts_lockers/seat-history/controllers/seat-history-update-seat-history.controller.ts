import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SeatHistoryUpdateService } from '../services/update-seat-history.service';
import { SeatHistoryUpdateDto } from '../dto/update-seat-history.dto';

@Controller('v1/admin/seat-history')
export class SeatHistoryUpdateController {
  constructor(private readonly service: SeatHistoryUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: SeatHistoryUpdateDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'SeatHistory updated successfully', data };
  }
}
