import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Expense } from '@/core/entities/expense.entity';
import { ExpensesGetExpensesQueryDto } from '../dto/expenses-get-expenses-query.dto';

@Injectable()
export class ExpensesGetAllService {
  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
  ) {}

  async execute(queryDto: ExpensesGetExpensesQueryDto): Promise<{ items: Expense[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Expense> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
