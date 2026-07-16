import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '@/core/entities/plan.entity';
import { PlansUpdatePlanDto } from '../dto/update-plan.dto';
import { PlanNotFoundException } from '../exceptions/plans.exceptions';

@Injectable()
export class PlansUpdatePlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async execute(id: string, dto: PlansUpdatePlanDto): Promise<Plan> {
    const existing = await this.planRepository.findOne({ where: { id } });
    if (!existing) {
      throw new PlanNotFoundException();
    }
    Object.assign(existing, dto);
    return await this.planRepository.save(existing);
  }
}
