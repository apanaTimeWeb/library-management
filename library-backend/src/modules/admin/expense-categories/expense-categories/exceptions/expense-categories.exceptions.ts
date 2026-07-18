import { HttpException, HttpStatus } from '@nestjs/common';
import { EXPENSE_CATEGORIES_CONSTANTS } from '../constants/expense-categories.constants';

export class ExpenseCategoryNotFoundException extends HttpException {
  constructor(message: string = EXPENSE_CATEGORIES_CONSTANTS.ERRORS.EXPENSE_CATEGORY_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
