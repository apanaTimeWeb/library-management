import { PartialType } from '@nestjs/mapped-types';
import { ExpenseCategoriesCreateExpenseCategoryDto } from './create-expense-category.dto';

export class ExpenseCategoriesUpdateExpenseCategoryDto extends PartialType(CreateExpenseCategoryDto) {}
