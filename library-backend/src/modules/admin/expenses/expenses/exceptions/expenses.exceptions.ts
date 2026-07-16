import { HttpException, HttpStatus } from '@nestjs/common';
import { EXPENSES_CONSTANTS } from '../constants/expenses.constants';

export class ExpenseNotFoundException extends HttpException {
  constructor(message: string = EXPENSES_CONSTANTS.ERRORS.EXPENSE_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
