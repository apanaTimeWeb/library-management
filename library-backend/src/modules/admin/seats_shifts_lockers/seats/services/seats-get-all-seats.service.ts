import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Seat } from '@/core/entities/seat.entity';
import { SeatsGetSeatsQueryDto } from '../dto/seats-get-seats-query.dto';

@Injectable()
export class SeatsGetAllService {
  constructor(
    @InjectRepository(Seat)
    private readonly repository: Repository<Seat>,
  ) {}

  async execute(queryDto: SeatsGetSeatsQueryDto): Promise<{ items: Seat[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Seat> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
