import { Controller, Patch, Param, Body } from '@nestjs/common';
import { PlansUpdatePlanService } from '../services/update-plan.service';
import { PlansUpdatePlanDto } from '../dto/update-plan.dto';

@Controller('api/v1/admin/plans')
export class PlansUpdatePlanController {
  constructor(private readonly updatePlanService: PlansUpdatePlanService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: PlansUpdatePlanDto) {
    const data = await this.updatePlanService.execute(id, dto);
    return {
      success: true,
      message: 'Plan updated successfully',
      data,
    };
  }
}
