import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '@/core/entities/expense.entity';

import { CreateExpenseController } from './controllers/create-expense.controller';
import { UpdateExpenseController } from './controllers/update-expense.controller';
import { DeleteExpenseController } from './controllers/delete-expense.controller';
import { GetAllExpensesController } from './controllers/get-all-expenses.controller';
import { GetExpenseController } from './controllers/get-expense.controller';

import { CreateExpenseService } from './services/create-expense.service';
import { UpdateExpenseService } from './services/update-expense.service';
import { DeleteExpenseService } from './services/delete-expense.service';
import { GetAllExpensesService } from './services/get-all-expenses.service';
import { GetExpenseService } from './services/get-expense.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [
    CreateExpenseController,
    UpdateExpenseController,
    DeleteExpenseController,
    GetAllExpensesController,
    GetExpenseController,
  ],
  providers: [
    CreateExpenseService,
    UpdateExpenseService,
    DeleteExpenseService,
    GetAllExpensesService,
    GetExpenseService,
  ],
  exports: [GetExpenseService],
})
export class AdminExpensesModule {}
