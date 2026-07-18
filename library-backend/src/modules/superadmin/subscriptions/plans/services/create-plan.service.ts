import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '@/core/entities/plan.entity';
import { CreatePlanDto } from '../dto/create-plan.dto';

@Injectable()
export class CreatePlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly repository: Repository<Plan>,
  ) {}

  async execute(dto: CreatePlanDto): Promise<Plan> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
