import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '@/core/entities/expense.entity';
import { CreateExpenseDto } from '@/modules/manager/finance/expenses/dto/create-expense.dto';

@Injectable()
export class ExpensesCreateService {
  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
  ) {}

  async execute(dto: CreateExpenseDto): Promise<Expense> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
