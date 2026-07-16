import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Holiday } from '@/core/entities/holiday.entity';
import { GetHolidaiesQueryDto } from '@/modules/manager/settings/holidays/dto/get-holidays-query.dto';

@Injectable()
export class HolidaysGetAllService {
  constructor(
    @InjectRepository(Holiday)
    private readonly repository: Repository<Holiday>,
  ) {}

  async execute(queryDto: GetHolidaiesQueryDto): Promise<{ items: Holiday[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Holiday> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
