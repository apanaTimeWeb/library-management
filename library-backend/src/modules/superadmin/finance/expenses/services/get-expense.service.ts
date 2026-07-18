import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '@/core/entities/expense.entity';
import { ExpenseNotFoundException } from '../exceptions/expenses.exceptions';

@Injectable()
export class GetExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
  ) {}

  async execute(id: string): Promise<Expense> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ExpenseNotFoundException();
    return existing;
  }
}
