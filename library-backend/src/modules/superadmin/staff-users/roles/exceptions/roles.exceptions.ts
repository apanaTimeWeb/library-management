import { HttpException, HttpStatus } from '@nestjs/common';
import { ROLES_CONSTANTS } from '../constants/roles.constants';

export class RoleNotFoundException extends HttpException {
  constructor(message: string = ROLES_CONSTANTS.ERRORS.ROLE_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
