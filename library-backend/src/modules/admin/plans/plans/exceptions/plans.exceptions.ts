import { HttpException, HttpStatus } from '@nestjs/common';
import { PLANS_CONSTANTS } from '../constants/plans.constants';

export class PlanNotFoundException extends HttpException {
  constructor(message: string = PLANS_CONSTANTS.ERRORS.PLAN_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class PlanAlreadyExistsException extends HttpException {
  constructor(message: string = PLANS_CONSTANTS.ERRORS.PLAN_ALREADY_EXISTS) {
    super(message, HttpStatus.CONFLICT);
  }
}
