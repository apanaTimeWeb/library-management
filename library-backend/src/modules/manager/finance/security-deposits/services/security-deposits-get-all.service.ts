import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { SecurityDeposit } from '@/core/entities/security-deposit.entity';
import { GetSecurityDepositsQueryDto } from '@/modules/manager/finance/security-deposits/dto/get-security-deposits-query.dto';

@Injectable()
export class SecurityDepositsGetAllService {
  constructor(
    @InjectRepository(SecurityDeposit)
    private readonly repository: Repository<SecurityDeposit>,
  ) {}

  async execute(queryDto: GetSecurityDepositsQueryDto): Promise<{ items: SecurityDeposit[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<SecurityDeposit> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
