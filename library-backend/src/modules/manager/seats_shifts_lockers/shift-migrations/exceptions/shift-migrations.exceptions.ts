import { HttpException, HttpStatus } from '@nestjs/common';
import { SHIFT_MIGRATIONS_CONSTANTS } from '@/modules/manager/seats_shifts_lockers/shift-migrations/constants/shift-migrations.constants';

export class ShiftMigrationNotFoundException extends HttpException {
  constructor(message: string = SHIFT_MIGRATIONS_CONSTANTS.ERRORS.SHIFT_MIGRATION_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
