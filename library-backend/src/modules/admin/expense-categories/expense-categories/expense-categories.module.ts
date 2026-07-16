import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategory } from '@/core/entities/expense.entity';

import { ExpenseCategoriesCreateExpenseCategoryController } from './controllers/expense-categories-create-expense-category.controller';
import { ExpenseCategoriesUpdateExpenseCategoryController } from './controllers/expense-categories-update-expense-category.controller';
import { ExpenseCategoriesDeleteExpenseCategoryController } from './controllers/expense-categories-delete-expense-category.controller';
import { ExpenseCategoriesGetAllController } from './controllers/expense-categories-get-all-expense-categories.controller';
import { ExpenseCategoriesGetExpenseCategoryController } from './controllers/expense-categories-get-expense-category.controller';

import { ExpenseCategoriesCreateExpenseCategoryService } from './services/expense-categories-create-expense-category.service';
import { ExpenseCategoriesUpdateExpenseCategoryService } from './services/expense-categories-update-expense-category.service';
import { ExpenseCategoriesDeleteExpenseCategoryService } from './services/expense-categories-delete-expense-category.service';
import { ExpenseCategoriesGetAllService } from './services/expense-categories-get-all-expense-categories.service';
import { ExpenseCategoriesGetExpenseCategoryService } from './services/expense-categories-get-expense-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCategory])],
  controllers: [ExpenseCategoriesCreateExpenseCategoryController, ExpenseCategoriesUpdateExpenseCategoryController, ExpenseCategoriesDeleteExpenseCategoryController, ExpenseCategoriesGetAllController, ExpenseCategoriesGetExpenseCategoryController, ],
  providers: [ExpenseCategoriesCreateExpenseCategoryService, ExpenseCategoriesUpdateExpenseCategoryService, ExpenseCategoriesDeleteExpenseCategoryService, ExpenseCategoriesGetAllService, ExpenseCategoriesGetExpenseCategoryService, ],
  exports: [ExpenseCategoriesGetExpenseCategoryService],
})
export class ExpenseCategoriesAdminModule {}
