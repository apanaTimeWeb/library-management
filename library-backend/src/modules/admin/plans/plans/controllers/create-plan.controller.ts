import { Controller, Post, Body } from '@nestjs/common';
import { CreatePlanService } from '../services/create-plan.service';
import { CreatePlanDto } from '../dto/create-plan.dto';

@Controller('api/v1/admin/plans')
export class CreatePlanController {
  constructor(private readonly createPlanService: CreatePlanService) {}

  @Post()
  async handle(@Body() dto: CreatePlanDto) {
    const data = await this.createPlanService.execute(dto);
    return {
      success: true,
      message: 'Plan created successfully',
      data,
    };
  }
}
