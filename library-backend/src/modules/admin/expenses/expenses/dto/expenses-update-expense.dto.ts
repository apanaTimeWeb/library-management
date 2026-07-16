import { PartialType } from '@nestjs/mapped-types';
import { ExpensesCreateExpenseDto } from './create-expense.dto';

export class ExpensesUpdateExpenseDto extends PartialType(CreateExpenseDto) {}
