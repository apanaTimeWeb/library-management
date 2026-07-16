import { Controller, Get, Param } from '@nestjs/common';
import { PlansGetPlanService } from '../services/plans-get-plan.service';

@Controller('v1/admin/plans')
export class PlansGetPlanController {
  constructor(private readonly getPlanService: PlansGetPlanService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.getPlanService.execute(id);
    return {
      success: true,
      message: 'Plan retrieved successfully',
      data,
    };
  }
}
