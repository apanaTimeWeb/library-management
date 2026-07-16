import { HttpException, HttpStatus } from '@nestjs/common';
import { ASSETS_CONSTANTS } from '../constants/assets.constants';

export class AssetNotFoundException extends HttpException {
  constructor(message: string = ASSETS_CONSTANTS.ERRORS.ASSET_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
