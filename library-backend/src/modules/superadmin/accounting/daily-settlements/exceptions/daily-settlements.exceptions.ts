import { HttpException, HttpStatus } from '@nestjs/common';
import { DAILY_SETTLEMENTS_CONSTANTS } from '../constants/daily-settlements.constants';

export class DailySettlementNotFoundException extends HttpException {
  constructor(message: string = DAILY_SETTLEMENTS_CONSTANTS.ERRORS.DAILY_SETTLEMENT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
