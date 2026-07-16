import { PartialType } from '@nestjs/mapped-types';
import { ExpensesCreateExpenseDto } from './expenses-create-expense.dto';

export class ExpensesUpdateExpenseDto extends PartialType(ExpensesCreateExpenseDto) {}
