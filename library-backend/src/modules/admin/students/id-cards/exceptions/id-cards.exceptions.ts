import { HttpException, HttpStatus } from '@nestjs/common';
import { ID_CARDS_CONSTANTS } from '../constants/id-cards.constants';

export class IDCardNotFoundException extends HttpException {
  constructor(message: string = ID_CARDS_CONSTANTS.ERRORS.ID_CARD_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
