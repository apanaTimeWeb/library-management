import { Controller, Get, Param } from '@nestjs/common';
import { GetPlanService } from '../services/get-plan.service';

@Controller('api/v1/admin/plans')
export class GetPlanController {
  constructor(private readonly getPlanService: GetPlanService) {}

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
