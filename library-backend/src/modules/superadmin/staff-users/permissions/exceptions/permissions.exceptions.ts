import { HttpException, HttpStatus } from '@nestjs/common';
import { PERMISSIONS_CONSTANTS } from '../constants/permissions.constants';

export class PermissionNotFoundException extends HttpException {
  constructor(message: string = PERMISSIONS_CONSTANTS.ERRORS.PERMISSION_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
