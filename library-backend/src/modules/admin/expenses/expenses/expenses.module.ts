import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '@/core/entities/expense.entity';

import { ExpensesCreateExpenseController } from './controllers/expenses-create-expense.controller';
import { ExpensesUpdateExpenseController } from './controllers/expenses-update-expense.controller';
import { ExpensesDeleteExpenseController } from './controllers/expenses-delete-expense.controller';
import { ExpensesGetAllController } from './controllers/expenses-get-all-expenses.controller';
import { ExpensesGetExpenseController } from './controllers/expenses-get-expense.controller';

import { ExpensesCreateExpenseService } from './services/expenses-create-expense.service';
import { ExpensesUpdateExpenseService } from './services/expenses-update-expense.service';
import { ExpensesDeleteExpenseService } from './services/expenses-delete-expense.service';
import { ExpensesGetAllService } from './services/expenses-get-all-expenses.service';
import { ExpensesGetExpenseService } from './services/expenses-get-expense.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [ExpensesCreateExpenseController, ExpensesUpdateExpenseController, ExpensesDeleteExpenseController, ExpensesGetAllController, ExpensesGetExpenseController, ],
  providers: [ExpensesCreateExpenseService, ExpensesUpdateExpenseService, ExpensesDeleteExpenseService, ExpensesGetAllService, ExpensesGetExpenseService, ],
  exports: [ExpensesGetExpenseService],
})
export class ExpensesAdminModule {}
