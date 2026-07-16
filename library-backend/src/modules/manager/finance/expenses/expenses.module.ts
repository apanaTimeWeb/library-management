import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '@/core/entities/expense.entity';

import { ExpensesCreateController } from '@/modules/manager/finance/expenses/controllers/expenses-create.controller';
import { ExpensesUpdateController } from '@/modules/manager/finance/expenses/controllers/expenses-update.controller';
import { ExpensesDeleteController } from '@/modules/manager/finance/expenses/controllers/expenses-delete.controller';
import { ExpensesGetAllController } from '@/modules/manager/finance/expenses/controllers/expenses-get-all.controller';
import { ExpensesGetController } from '@/modules/manager/finance/expenses/controllers/expenses-get.controller';

import { ExpensesCreateService } from '@/modules/manager/finance/expenses/services/expenses-create.service';
import { ExpensesUpdateService } from '@/modules/manager/finance/expenses/services/expenses-update.service';
import { ExpensesDeleteService } from '@/modules/manager/finance/expenses/services/expenses-delete.service';
import { ExpensesGetAllService } from '@/modules/manager/finance/expenses/services/expenses-get-all.service';
import { ExpensesGetService } from '@/modules/manager/finance/expenses/services/expenses-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [
    ExpensesCreateController,
    ExpensesUpdateController,
    ExpensesDeleteController,
    ExpensesGetAllController,
    ExpensesGetController,
  ],
  providers: [
    ExpensesCreateService,
    ExpensesUpdateService,
    ExpensesDeleteService,
    ExpensesGetAllService,
    ExpensesGetService,
  ],
  exports: [ExpensesGetService],
})
export class ManagerExpensesModule {}
