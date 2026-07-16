import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ExpenseCategory } from '@/core/entities/expense.entity';
import { ExpenseCategoriesGetExpenseCategoriesQueryDto } from '../dto/get-expense-categories-query.dto';

@Injectable()
export class ExpenseCategoriesGetAllService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private readonly repository: Repository<ExpenseCategory>,
  ) {}

  async execute(queryDto: ExpenseCategoriesGetExpenseCategoriesQueryDto): Promise<{ items: ExpenseCategory[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<ExpenseCategory> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
