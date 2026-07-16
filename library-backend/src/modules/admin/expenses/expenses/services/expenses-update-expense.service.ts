import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '@/core/entities/expense.entity';
import { ExpensesUpdateExpenseDto } from '../dto/update-expense.dto';
import { ExpenseNotFoundException } from '../exceptions/expenses.exceptions';

@Injectable()
export class ExpensesUpdateExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
  ) {}

  async execute(id: string, dto: ExpensesUpdateExpenseDto): Promise<Expense> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ExpenseNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
