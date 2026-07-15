import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminExpensesService } from './expenses.service';
import { SuperadminExpensesController } from './expenses.controller';
import { Expense, ExpenseCategory } from '../../../../core/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseCategory])],
  providers: [SuperadminExpensesService],
  controllers: [SuperadminExpensesController]
})
export class SuperadminExpensesModule {}
