import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseCategory } from '@/core/entities/expense.entity';
import { UpdateExpenseCategoryDto } from '../dto/update-expense-category.dto';
import { ExpenseCategoryNotFoundException } from '../exceptions/expense-categories.exceptions';

@Injectable()
export class UpdateExpenseCategoryService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private readonly repository: Repository<ExpenseCategory>,
  ) {}

  async execute(id: string, dto: UpdateExpenseCategoryDto): Promise<ExpenseCategory> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ExpenseCategoryNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
