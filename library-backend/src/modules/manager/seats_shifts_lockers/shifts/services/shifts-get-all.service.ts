import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Shift } from '@/core/entities/shift.entity';
import { GetShiftsQueryDto } from '@/modules/manager/seats_shifts_lockers/shifts/dto/get-shifts-query.dto';

@Injectable()
export class ShiftsGetAllService {
  constructor(
    @InjectRepository(Shift)
    private readonly repository: Repository<Shift>,
  ) {}

  async execute(queryDto: GetShiftsQueryDto): Promise<{ items: Shift[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Shift> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
