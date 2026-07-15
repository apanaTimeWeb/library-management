import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerExpensesService } from './expenses.service';
import { ManagerExpensesController } from './expenses.controller';
import { Expense, ExpenseCategory } from '../../../core/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseCategory])],
  providers: [ManagerExpensesService],
  controllers: [ManagerExpensesController]
})
export class ManagerExpensesModule {}
