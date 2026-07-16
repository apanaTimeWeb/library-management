import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '@/core/entities/plan.entity';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { PlanAlreadyExistsException } from '../exceptions/plans.exceptions';

@Injectable()
export class CreatePlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async execute(dto: CreatePlanDto): Promise<Plan> {
    const existing = await this.planRepository.findOne({ where: { name: dto.name } });
    if (existing) {
      throw new PlanAlreadyExistsException();
    }
    const plan = this.planRepository.create(dto);
    return await this.planRepository.save(plan);
  }
}
