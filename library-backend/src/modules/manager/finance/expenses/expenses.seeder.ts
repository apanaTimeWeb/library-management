import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '@/core/entities/expense.entity';

@Injectable()
export class ExpensesSeeder {
  private readonly logger = new Logger(ExpensesSeeder.name);

  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async seed() {
    this.logger.log('Seeding Manager Expenses...');
    // Seeding logic here
    this.logger.log('Manager Expenses seeded successfully.');
  }
}
