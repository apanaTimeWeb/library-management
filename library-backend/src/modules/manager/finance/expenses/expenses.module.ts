import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense, ExpenseCategory } from '@/core/entities/expense.entity';
import { AuthAuthModule } from '@/modules/auth/auth/auth.module';

// Micro-Services
import { GetAllExpensesService } from './services/get-all-expenses.service';

// Micro-Controllers
import { GetAllExpensesController } from './controllers/get-all-expenses.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, ExpenseCategory]),
    AuthAuthModule,
  ],
  providers: [GetAllExpensesService],
  controllers: [GetAllExpensesController],
})
export class ManagerExpensesModule {}
