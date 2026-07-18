import { HttpException, HttpStatus } from '@nestjs/common';
import { LIBRARIES_CONSTANTS } from '../constants/libraries.constants';

export class LibraryNotFoundException extends HttpException {
  constructor(message: string = LIBRARIES_CONSTANTS.ERRORS.LIBRARY_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
