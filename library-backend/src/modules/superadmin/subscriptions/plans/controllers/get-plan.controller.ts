import { Controller, Get, Param } from '@nestjs/common';
import { GetPlanService } from '../services/get-plan.service';

@Controller('api/v1/superadmin/plans')
export class GetPlanController {
  constructor(private readonly service: GetPlanService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Plan retrieved successfully', data };
  }
}
