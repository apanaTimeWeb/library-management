import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Plan } from '@/core/entities/plan.entity';
import { PlansGetPlansQueryDto } from '../dto/plans-get-plans-query.dto';

@Injectable()
export class PlansGetAllService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async execute(queryDto: PlansGetPlansQueryDto): Promise<{ items: Plan[]; total: number }> {
    const { page = 1, limit = 20, search, status } = queryDto;
    
    const where: FindOptionsWhere<Plan> = {};
    if (search) where.name = ILike(`%${search}%`);
    if (status) where.status = status as any;

    const [items, total] = await this.planRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { items, total };
  }
}
