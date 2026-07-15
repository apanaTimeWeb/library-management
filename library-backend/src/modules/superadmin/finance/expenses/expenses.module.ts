import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetAllExpensesService } from './services/get-all-expenses.service';
import { GetAllExpensesController } from './controllers/get-all-expenses.controller';
import { Expense, ExpenseCategory } from '@/core/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseCategory])],
  providers: [GetAllExpensesService],
  controllers: [GetAllExpensesController],
})
export class SuperadminExpensesModule {}
