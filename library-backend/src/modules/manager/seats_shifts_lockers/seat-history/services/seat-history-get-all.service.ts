import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { SeatHistory } from '@/core/entities/seat-history.entity';
import { GetSeatHistoriesQueryDto } from '@/modules/manager/seats_shifts_lockers/seat-history/dto/get-seat-history-query.dto';

@Injectable()
export class SeatHistoryGetAllService {
  constructor(
    @InjectRepository(SeatHistory)
    private readonly repository: Repository<SeatHistory>,
  ) {}

  async execute(queryDto: GetSeatHistoriesQueryDto): Promise<{ items: SeatHistory[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<SeatHistory> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
