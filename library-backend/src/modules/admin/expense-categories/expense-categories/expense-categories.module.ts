import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategory } from '@/core/entities/expense.entity';

import { ExpenseCategoriesCreateExpenseCategoryController } from './controllers/create-expense-category.controller';
import { ExpenseCategoriesUpdateExpenseCategoryController } from './controllers/update-expense-category.controller';
import { ExpenseCategoriesDeleteExpenseCategoryController } from './controllers/delete-expense-category.controller';
import { ExpenseCategoriesGetAllController } from './controllers/get-all-expense-categories.controller';
import { ExpenseCategoriesGetExpenseCategoryController } from './controllers/get-expense-category.controller';

import { ExpenseCategoriesCreateExpenseCategoryService } from './services/create-expense-category.service';
import { ExpenseCategoriesUpdateExpenseCategoryService } from './services/update-expense-category.service';
import { ExpenseCategoriesDeleteExpenseCategoryService } from './services/delete-expense-category.service';
import { ExpenseCategoriesGetAllService } from './services/get-all-expense-categories.service';
import { ExpenseCategoriesGetExpenseCategoryService } from './services/get-expense-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCategory])],
  controllers: [ExpenseCategoriesCreateExpenseCategoryController, ExpenseCategoriesUpdateExpenseCategoryController, ExpenseCategoriesDeleteExpenseCategoryController, ExpenseCategoriesGetAllController, ExpenseCategoriesGetExpenseCategoryController, ],
  providers: [ExpenseCategoriesCreateExpenseCategoryService, ExpenseCategoriesUpdateExpenseCategoryService, ExpenseCategoriesDeleteExpenseCategoryService, ExpenseCategoriesGetAllService, ExpenseCategoriesGetExpenseCategoryService, ],
  exports: [ExpenseCategoriesGetExpenseCategoryService],
})
export class ExpenseCategoriesAdminModule {}
