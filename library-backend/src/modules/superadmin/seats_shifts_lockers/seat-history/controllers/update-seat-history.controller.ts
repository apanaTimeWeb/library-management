import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateSeatHistoryService } from '../services/update-seat-history.service';
import { UpdateSeatHistoryDto } from '../dto/update-seat-history.dto';

@Controller('api/v1/superadmin/seat-history')
export class UpdateSeatHistoryController {
  constructor(private readonly service: UpdateSeatHistoryService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateSeatHistoryDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'SeatHistory updated successfully', data };
  }
}
