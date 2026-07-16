import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseCategory } from '@/core/entities/expense.entity';
import { ExpenseCategoriesCreateExpenseCategoryDto } from '../dto/create-expense-category.dto';

@Injectable()
export class ExpenseCategoriesCreateExpenseCategoryService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private readonly repository: Repository<ExpenseCategory>,
  ) {}

  async execute(dto: ExpenseCategoriesCreateExpenseCategoryDto): Promise<ExpenseCategory> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
