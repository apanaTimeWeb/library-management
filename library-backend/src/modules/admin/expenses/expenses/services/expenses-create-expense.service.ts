import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '@/core/entities/expense.entity';
import { ExpensesCreateExpenseDto } from '../dto/expenses-create-expense.dto';

@Injectable()
export class ExpensesCreateExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
  ) {}

  async execute(dto: ExpensesCreateExpenseDto): Promise<Expense> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
