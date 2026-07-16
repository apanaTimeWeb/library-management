import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '@/core/entities/plan.entity';
import { PlanNotFoundException } from '../exceptions/plans.exceptions';

@Injectable()
export class GetPlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async execute(id: string): Promise<Plan> {
    const existing = await this.planRepository.findOne({ where: { id } });
    if (!existing) {
      throw new PlanNotFoundException();
    }
    return existing;
  }
}
