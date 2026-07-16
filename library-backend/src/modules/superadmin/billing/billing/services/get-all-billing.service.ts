import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Billing } from '@/core/entities/billing.entity';
import { GetBillingsQueryDto } from '../dto/get-billing-query.dto';

@Injectable()
export class GetAllBillingsService {
  constructor(
    @InjectRepository(Billing)
    private readonly repository: Repository<Billing>,
  ) {}

  async execute(queryDto: GetBillingsQueryDto): Promise<{ items: Billing[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Billing> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
