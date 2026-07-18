import { HttpException, HttpStatus } from '@nestjs/common';
import { SETUP_WIZARD_CONSTANTS } from '../constants/setup-wizard.constants';

export class SetupWizardNotFoundException extends HttpException {
  constructor(message: string = SETUP_WIZARD_CONSTANTS.ERRORS.SETUP_WIZARD_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
