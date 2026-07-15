import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminExpensesService } from './expenses.service';
import { AdminExpensesController } from './expenses.controller';
import { Expense, ExpenseCategory } from '@/core/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseCategory])],
  providers: [AdminExpensesService],
  controllers: [AdminExpensesController],
})
export class AdminExpensesModule {}
