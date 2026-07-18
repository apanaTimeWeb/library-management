import { Controller, Post, Body } from '@nestjs/common';
import { PlansCreatePlanService } from '../services/plans-create-plan.service';
import { PlansCreatePlanDto } from '../dto/plans-create-plan.dto';

@Controller('v1/admin/plans')
export class PlansCreatePlanController {
  constructor(private readonly createPlanService: PlansCreatePlanService) {}

  @Post()
  async handle(@Body() dto: PlansCreatePlanDto) {
    const data = await this.createPlanService.execute(dto);
    return {
      success: true,
      message: 'Plan created successfully',
      data,
    };
  }
}
