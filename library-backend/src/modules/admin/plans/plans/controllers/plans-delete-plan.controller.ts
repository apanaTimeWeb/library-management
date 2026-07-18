import { Controller, Delete, Param } from '@nestjs/common';
import { PlansDeletePlanService } from '../services/plans-delete-plan.service';

@Controller('v1/admin/plans')
export class PlansDeletePlanController {
  constructor(private readonly deletePlanService: PlansDeletePlanService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.deletePlanService.execute(id);
    return {
      success: true,
      message: 'Plan deleted successfully',
      data: null,
    };
  }
}
