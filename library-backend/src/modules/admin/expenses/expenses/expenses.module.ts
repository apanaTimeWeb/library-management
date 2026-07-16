import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '@/core/entities/expense.entity';

import { ExpensesCreateExpenseController } from './controllers/create-expense.controller';
import { ExpensesUpdateExpenseController } from './controllers/update-expense.controller';
import { ExpensesDeleteExpenseController } from './controllers/delete-expense.controller';
import { ExpensesGetAllController } from './controllers/get-all-expenses.controller';
import { ExpensesGetExpenseController } from './controllers/get-expense.controller';

import { ExpensesCreateExpenseService } from './services/create-expense.service';
import { ExpensesUpdateExpenseService } from './services/update-expense.service';
import { ExpensesDeleteExpenseService } from './services/delete-expense.service';
import { ExpensesGetAllService } from './services/get-all-expenses.service';
import { ExpensesGetExpenseService } from './services/get-expense.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [ExpensesCreateExpenseController, ExpensesUpdateExpenseController, ExpensesDeleteExpenseController, ExpensesGetAllController, ExpensesGetExpenseController, ],
  providers: [ExpensesCreateExpenseService, ExpensesUpdateExpenseService, ExpensesDeleteExpenseService, ExpensesGetAllService, ExpensesGetExpenseService, ],
  exports: [ExpensesGetExpenseService],
})
export class ExpensesAdminModule {}
