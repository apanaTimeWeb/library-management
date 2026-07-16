import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategory } from '@/core/entities/expense.entity';

import { CreateExpenseCategoryController } from './controllers/create-expense-category.controller';
import { UpdateExpenseCategoryController } from './controllers/update-expense-category.controller';
import { DeleteExpenseCategoryController } from './controllers/delete-expense-category.controller';
import { GetAllExpenseCategoriesController } from './controllers/get-all-expense-categories.controller';
import { GetExpenseCategoryController } from './controllers/get-expense-category.controller';

import { CreateExpenseCategoryService } from './services/create-expense-category.service';
import { UpdateExpenseCategoryService } from './services/update-expense-category.service';
import { DeleteExpenseCategoryService } from './services/delete-expense-category.service';
import { GetAllExpenseCategoriesService } from './services/get-all-expense-categories.service';
import { GetExpenseCategoryService } from './services/get-expense-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCategory])],
  controllers: [
    CreateExpenseCategoryController,
    UpdateExpenseCategoryController,
    DeleteExpenseCategoryController,
    GetAllExpenseCategoriesController,
    GetExpenseCategoryController,
  ],
  providers: [
    CreateExpenseCategoryService,
    UpdateExpenseCategoryService,
    DeleteExpenseCategoryService,
    GetAllExpenseCategoriesService,
    GetExpenseCategoryService,
  ],
  exports: [GetExpenseCategoryService],
})
export class AdminExpenseCategoriesModule {}
