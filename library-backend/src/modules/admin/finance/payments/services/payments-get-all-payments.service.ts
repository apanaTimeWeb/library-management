import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Payment } from '@/core/entities/payment.entity';
import { PaymentsGetPaymentsQueryDto } from '../dto/payments-get-payments-query.dto';

@Injectable()
export class PaymentsGetAllService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async execute(queryDto: PaymentsGetPaymentsQueryDto): Promise<{ items: Payment[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Payment> = {};
    // add search logic if applicable
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
