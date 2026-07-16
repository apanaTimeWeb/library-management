import { PartialType } from '@nestjs/swagger';
import { ExpensesCreateExpenseDto } from './expenses-create-expense.dto';
export class ExpensesUpdateExpenseDto extends PartialType(ExpensesCreateExpenseDto) {}