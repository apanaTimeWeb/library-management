import { HttpException, HttpStatus } from '@nestjs/common';
import { BRANCHES_CONSTANTS } from '../constants/branches.constants';

export class BranchNotFoundException extends HttpException {
  constructor(message: string = BRANCHES_CONSTANTS.ERRORS.BRANCH_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
