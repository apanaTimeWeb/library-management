import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePlanService } from '../services/delete-plan.service';

@Controller('api/v1/superadmin/plans')
export class DeletePlanController {
  constructor(private readonly service: DeletePlanService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Plan deleted successfully', data: null };
  }
}
