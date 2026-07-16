import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdatePlanService } from '../services/update-plan.service';
import { UpdatePlanDto } from '../dto/update-plan.dto';

@Controller('api/v1/admin/plans')
export class UpdatePlanController {
  constructor(private readonly updatePlanService: UpdatePlanService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    const data = await this.updatePlanService.execute(id, dto);
    return {
      success: true,
      message: 'Plan updated successfully',
      data,
    };
  }
}
