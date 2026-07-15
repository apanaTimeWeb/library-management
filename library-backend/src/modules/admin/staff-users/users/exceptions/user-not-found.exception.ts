import { NotFoundException } from '@nestjs/common';
import { USER_ERRORS } from '../constants/users.constants';

export class UserNotFoundException extends NotFoundException {
  constructor(message: string = USER_ERRORS.USER_NOT_FOUND) {
    super(message);
  }
}
