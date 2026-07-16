import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteDailySettlementService } from '../services/delete-daily-settlement.service';

@Controller('api/v1/superadmin/daily-settlements')
export class DeleteDailySettlementController {
  constructor(private readonly service: DeleteDailySettlementService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'DailySettlement deleted successfully', data: null };
  }
}
