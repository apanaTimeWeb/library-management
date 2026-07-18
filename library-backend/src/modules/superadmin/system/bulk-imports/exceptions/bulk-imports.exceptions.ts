import { HttpException, HttpStatus } from '@nestjs/common';
import { BULK_IMPORTS_CONSTANTS } from '../constants/bulk-imports.constants';

export class BulkImportNotFoundException extends HttpException {
  constructor(message: string = BULK_IMPORTS_CONSTANTS.ERRORS.BULK_IMPORT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
