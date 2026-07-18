import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { DailySettlement } from '@/core/entities/daily-settlement.entity';
import { GetDailySettlementsQueryDto } from '../dto/get-daily-settlements-query.dto';

@Injectable()
export class GetAllDailySettlementsService {
  constructor(
    @InjectRepository(DailySettlement)
    private readonly repository: Repository<DailySettlement>,
  ) {}

  async execute(queryDto: GetDailySettlementsQueryDto): Promise<{ items: DailySettlement[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<DailySettlement> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
