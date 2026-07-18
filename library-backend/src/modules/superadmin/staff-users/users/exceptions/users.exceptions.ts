import { HttpException, HttpStatus } from '@nestjs/common';
import { USERS_CONSTANTS } from '../constants/users.constants';

export class UserNotFoundException extends HttpException {
  constructor(message: string = USERS_CONSTANTS.ERRORS.USER_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
