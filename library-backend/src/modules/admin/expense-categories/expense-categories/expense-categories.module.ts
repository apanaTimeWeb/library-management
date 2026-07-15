import { Module } from '@nestjs/common';
import { AdminExpenseCategoriesController } from './expense-categories.controller';
import { AdminExpenseCategoriesService } from './expense-categories.service';

@Module({
  controllers: [AdminExpenseCategoriesController],
  providers: [AdminExpenseCategoriesService],
})
export class AdminExpenseCategoriesModule {}
