import { HttpException, HttpStatus } from '@nestjs/common';
import { SUBSCRIPTIONS_CONSTANTS } from '../constants/subscriptions.constants';

export class SubscriptionNotFoundException extends HttpException {
  constructor(message: string = SUBSCRIPTIONS_CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
