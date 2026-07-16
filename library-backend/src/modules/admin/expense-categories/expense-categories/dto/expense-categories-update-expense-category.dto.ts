import { PartialType } from '@nestjs/mapped-types';
import { ExpenseCategoriesCreateExpenseCategoryDto } from './expense-categories-create-expense-category.dto';

export class ExpenseCategoriesUpdateExpenseCategoryDto extends PartialType(ExpenseCategoriesCreateExpenseCategoryDto) {}
