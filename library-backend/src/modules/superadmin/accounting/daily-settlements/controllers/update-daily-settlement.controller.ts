import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateDailySettlementService } from '../services/update-daily-settlement.service';
import { UpdateDailySettlementDto } from '../dto/update-daily-settlement.dto';

@Controller('api/v1/superadmin/daily-settlements')
export class UpdateDailySettlementController {
  constructor(private readonly service: UpdateDailySettlementService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateDailySettlementDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'DailySettlement updated successfully', data };
  }
}
