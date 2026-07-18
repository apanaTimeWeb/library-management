import { HttpException, HttpStatus } from '@nestjs/common';
import { DOCUMENTS_CONSTANTS } from '@/modules/manager/documents/documents/constants/documents.constants';

export class DocumentNotFoundException extends HttpException {
  constructor(message: string = DOCUMENTS_CONSTANTS.ERRORS.DOCUMENT_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
