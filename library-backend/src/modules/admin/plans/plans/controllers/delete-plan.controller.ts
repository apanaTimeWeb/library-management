import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePlanService } from '../services/delete-plan.service';

@Controller('api/v1/admin/plans')
export class DeletePlanController {
  constructor(private readonly deletePlanService: DeletePlanService) {}

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
