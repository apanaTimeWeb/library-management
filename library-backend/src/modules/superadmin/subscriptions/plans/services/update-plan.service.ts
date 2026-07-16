import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '@/core/entities/plan.entity';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanNotFoundException } from '../exceptions/plans.exceptions';

@Injectable()
export class UpdatePlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly repository: Repository<Plan>,
  ) {}

  async execute(id: string, dto: UpdatePlanDto): Promise<Plan> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new PlanNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
