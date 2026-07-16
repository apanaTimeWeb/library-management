import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseCategory } from '@/core/entities/expense.entity';
import { ExpenseCategoryNotFoundException } from '../exceptions/expense-categories.exceptions';

@Injectable()
export class GetExpenseCategoryService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private readonly repository: Repository<ExpenseCategory>,
  ) {}

  async execute(id: string): Promise<ExpenseCategory> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ExpenseCategoryNotFoundException();
    return existing;
  }
}
