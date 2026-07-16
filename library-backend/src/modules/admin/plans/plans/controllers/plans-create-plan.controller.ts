import { Controller, Post, Body } from '@nestjs/common';
import { PlansCreatePlanService } from '../services/create-plan.service';
import { PlansCreatePlanDto } from '../dto/create-plan.dto';

@Controller('api/v1/admin/plans')
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
